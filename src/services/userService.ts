import { User } from '../types';
import { auth, db, firebaseConfig } from '../lib/firebase';
import { initializeApp, deleteApp } from 'firebase/app';
import { 
  getAuth,
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
  signOut
} from 'firebase/auth';
import { ref, get, remove, update } from 'firebase/database';

export const SUPER_OWNER_EMAILS = [
  'mastermaind.qureshi110@gmail.com',
  'fareed.ghulam@gmail.com'
];

export function isSuperOwner(email?: string | null): boolean {
  if (!email) return false;
  return SUPER_OWNER_EMAILS.includes(email.toLowerCase().trim());
}

export async function registerInAuthOnly(email: string, passwordInput: string, cachedUsers?: User[]): Promise<string> {
  const secondaryAppName = `SecondaryAuth_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
  const secondaryAuth = getAuth(secondaryApp);
  try {
    const cred = await createUserWithEmailAndPassword(secondaryAuth, email.toLowerCase().trim(), passwordInput);
    console.log(`[FirebaseAuth] Registered user ${email} in Auth successfully.`);
    return cred.user.uid;
  } catch (err: any) {
    if (err && err.code === 'auth/email-already-in-use') {
      console.log(`[FirebaseAuth] User ${email} already exists in Auth.`);
      if (cachedUsers && Array.isArray(cachedUsers)) {
        const existingUser = cachedUsers.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
        if (existingUser && existingUser.uid) {
          return existingUser.uid;
        }
      }
      throw err;
    } else if (err && err.code === 'auth/operation-not-allowed') {
      console.error(`[FirebaseAuth] Error: Email/Password provider is disabled in the Firebase Console.`, err);
      throw err;
    } else {
      console.error(`[FirebaseAuth] Error in registerInAuthOnly for ${email}:`, err);
      throw err;
    }
  } finally {
    await deleteApp(secondaryApp);
  }
}

export async function sendPasswordResetLink(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'براہ کرم درست ای میل درج کریں۔' };
    }
    await sendPasswordResetEmail(auth, email.toLowerCase().trim());
    return { success: true };
  } catch (err: any) {
    console.error('Password reset link error:', err);
    let msg = 'پاس ورڈ ری سیٹ ای میل بھیجنے میں ناکامی۔';
    if (err.code === 'auth/user-not-found') {
      msg = 'اس ای میل کا کوئی اکاؤنٹ موجود نہیں ہے۔';
    } else if (err.code === 'auth/invalid-email') {
      msg = 'ای میل ایڈریس درست نہیں ہے۔';
    }
    return { success: false, error: msg };
  }
}

export interface DeleteAccountResult {
  success: boolean;
  requiresRecentLogin?: boolean;
  error?: string;
  message?: string;
}

/**
 * Permanently and securely deletes the authenticated user's own account.
 * 
 * Security Guarantees:
 * 1. Derives identity solely from auth.currentUser (never trusts user-supplied UID).
 * 2. Explicitly protects Super Owners from deletion.
 * 3. Handles reauthentication for 'auth/requires-recent-login'.
 * 4. Deletes RTDB user profile at users/{uid} and cleans up user-specific pending demands.
 * 5. Deletes Firebase Authentication record.
 * 6. Cleans local storage and session cache.
 */
export async function deleteCurrentUserAccount(password?: string): Promise<DeleteAccountResult> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return {
      success: false,
      error: 'آپ لاگ ان نہیں ہیں۔ براہ کرم پہلے لاگ ان کریں۔ (User is not authenticated.)'
    };
  }

  const uid = currentUser.uid;
  const email = (currentUser.email || '').toLowerCase().trim();

  // 1. Super Owner Protection
  if (isSuperOwner(email)) {
    return {
      success: false,
      error: 'سپر اونر (Super Owner) اکاؤنٹ کو حذف نہیں کیا جا سکتا۔'
    };
  }

  // 2. Handle Reauthentication if password provided
  if (password && email) {
    try {
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(currentUser, credential);
    } catch (reauthErr: any) {
      console.warn('[AccountDeletion] Reauthentication with password failed:', reauthErr);
      if (reauthErr?.code === 'auth/wrong-password' || reauthErr?.code === 'auth/invalid-credential') {
        return {
          success: false,
          error: 'درج کردہ پاس ورڈ درست نہیں ہے۔ براہ کرم درست پاس ورڈ درج کریں۔'
        };
      }
      return {
        success: false,
        error: reauthErr?.message || 'تصدیق کے دوران خرابی پیش آئی۔'
      };
    }
  }

  // 3. Remove Realtime Database Profile & associated personal data
  try {
    // Delete primary profile at users/{uid}
    await remove(ref(db, `users/${uid}`));

    // Clean up any legacy email key if exists
    if (email) {
      const legacyEmailKey = email.replace(/[.#$\[\]]/g, '_');
      try {
        const legacySnap = await get(ref(db, `users/${legacyEmailKey}`));
        if (legacySnap.exists()) {
          await remove(ref(db, `users/${legacyEmailKey}`));
        }
      } catch (legacyErr) {
        // Ignore legacy cleanup errors
      }
    }

    // Cancel / remove active pending demands created by this user
    try {
      const demandsSnap = await get(ref(db, 'demands'));
      if (demandsSnap.exists()) {
        const val = demandsSnap.val();
        const updates: Record<string, any> = {};
        for (const dId of Object.keys(val)) {
          const dem = val[dId];
          if (dem && (dem.userEmail || '').toLowerCase().trim() === email && dem.status === 'pending') {
            updates[`demands/${dId}`] = null;
          }
        }
        if (Object.keys(updates).length > 0) {
          await update(ref(db), updates);
        }
      }
    } catch (demandsErr) {
      console.warn('[AccountDeletion] Pending demands cleanup error:', demandsErr);
    }
  } catch (dbErr: any) {
    console.error('[AccountDeletion] RTDB deletion error:', dbErr);
    return {
      success: false,
      error: 'ڈیٹا بیس سے پروفائل حذف کرنے میں ناکامی: ' + (dbErr?.message || 'نامعلوم خرابی')
    };
  }

  // 4. Delete Firebase Authentication user
  try {
    await deleteUser(currentUser);
  } catch (authErr: any) {
    console.warn('[AccountDeletion] deleteUser failed:', authErr);
    if (authErr?.code === 'auth/requires-recent-login') {
      return {
        success: false,
        requiresRecentLogin: true,
        error: 'سیکیورٹی تقاضے کے تحت، اکاؤنٹ حذف کرنے سے پہلے حالیہ لاگ ان یا پاس ورڈ کی تصدیق لازمی ہے۔'
      };
    }
    return {
      success: false,
      error: 'فائر بیس اکاؤنٹ حذف کرنے میں ناکامی: ' + (authErr?.message || 'نامعلوم خرابی')
    };
  }

  // 5. Cleanup local storage and session
  try {
    localStorage.removeItem('mqe_cached_user_profile');
    sessionStorage.removeItem('admin_verified');
    await signOut(auth);
  } catch (e) {
    // Ignore signout cleanup errors
  }

  return {
    success: true,
    message: 'آپ کا اکاؤنٹ اور تمام ذاتی ڈیٹا کامیابی سے مستقل طور پر حذف کر دیا گیا ہے۔'
  };
}

/**
 * Reauthenticates using Google provider and deletes the current account.
 */
export async function reauthenticateGoogleAndDelete(): Promise<DeleteAccountResult> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { success: false, error: 'صارف لاگ ان نہیں ہے۔' };
  }

  const email = (currentUser.email || '').toLowerCase().trim();
  if (isSuperOwner(email)) {
    return { success: false, error: 'سپر اونر (Super Owner) اکاؤنٹ کو حذف نہیں کیا جا سکتا۔' };
  }

  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    return await deleteCurrentUserAccount();
  } catch (err: any) {
    console.error('[AccountDeletion] Google reauth failed:', err);
    return {
      success: false,
      error: err?.message || 'گوگل تصدیق میں خرابی پیش آئی۔'
    };
  }
}

export interface AdminDeleteUserResult {
  success: boolean;
  error?: string;
  message?: string;
  isDatabaseOnly?: boolean;
}

/**
 * Super Admin initiated database profile removal.
 * 
 * Accurately deletes the Realtime Database profile and revokes system permissions.
 * Does NOT falsely claim to delete Firebase Auth (which requires server-side Admin SDK
 * to prevent exposing private server service-account keys to frontend browsers).
 */
export async function adminDeleteUserDatabaseRecord(
  targetEmail: string,
  actor: User | null,
  cachedUsers: User[]
): Promise<AdminDeleteUserResult> {
  if (!actor || (!actor.isAdmin && actor.role !== 'superAdmin')) {
    return {
      success: false,
      error: 'صرف سپر ایڈمن کو صارفین کے ریکارڈز حذف کرنے کا اختیار حاصل ہے۔ (Unauthorized: Super Admin required.)'
    };
  }

  const targetClean = targetEmail.toLowerCase().trim();
  const actorEmailClean = (actor.email || '').toLowerCase().trim();

  // 1. Protect Super Owners
  if (isSuperOwner(targetClean)) {
    return {
      success: false,
      error: 'سپر مالک (Super Owner) اکاؤنٹ کا ڈیٹا بیس ریکارڈ حذف نہیں کیا جا سکتا۔'
    };
  }

  // 2. Prevent self-deletion via admin portal
  if (targetClean === actorEmailClean) {
    return {
      success: false,
      error: 'آپ ایڈمن پورٹل سے اپنا اکاؤنٹ خود حذف نہیں کر سکتے۔ براہ کرم ذاتی پروفائل کا ڈیلیٹ آپشن استعمال کریں۔'
    };
  }

  const targetUser = cachedUsers.find(u => (u.email || '').toLowerCase().trim() === targetClean);
  const targetUid = targetUser?.uid;

  if (!targetUid) {
    return {
      success: false,
      error: `صارف (${targetEmail}) کا درست UID سسٹم میں نہیں ملا۔`
    };
  }

  try {
    // Remove users/{uid} node
    await remove(ref(db, `users/${targetUid}`));

    // Clean up legacy email key if exists
    const legacyKey = targetClean.replace(/[.#$\[\]]/g, '_');
    try {
      const snap = await get(ref(db, `users/${legacyKey}`));
      if (snap.exists()) {
        await remove(ref(db, `users/${legacyKey}`));
      }
    } catch (e) {
      // Ignore
    }

    return {
      success: true,
      isDatabaseOnly: true,
      message: `کامیاب: صارف (${targetEmail}) کا ڈیٹا بیس پروفائل اور تمام رسائیاں کامیابی سے حذف کر دی گئی ہیں۔ کلائنٹ سیکیورٹی اصولوں کے تحت فائر بیس آتھ (Authentication) ریکارڈ اگر درکار ہو تو فائر بیس کنسول سے مانیٹر یا ڈیلیٹ کیا جا سکتا ہے۔`
    };
  } catch (err: any) {
    console.error('[AdminDeleteUser] Failed to remove RTDB user node:', err);
    return {
      success: false,
      error: `ڈیٹا بیس ریکارڈ حذف کرنے میں خرابی: ${err?.message || 'نامعلوم خرابی'}`
    };
  }
}
