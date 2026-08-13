import { User } from '../types';
import { db, auth, firebaseConfig } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocFromServer,
  getDocs
} from 'firebase/firestore';
import { initializeApp, deleteApp } from 'firebase/app';
import { 
  getAuth,
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

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
