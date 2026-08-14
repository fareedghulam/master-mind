import { User, Booking, NumberLimit, Demand, DrawDeadline, PakistanBondResult, ThaiLotteryResult, AllResultType, DrawCategory, Transaction } from '../types';
import { db, auth, firebaseConfig } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc,
  deleteDoc, 
  onSnapshot,
  runTransaction,
  getDocFromServer,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { initializeApp, deleteApp } from 'firebase/app';
import { 
  getAuth,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updatePassword,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { pakistanBondDraws } from './pakistanBondData';
import { thaiHistoricalDraws } from './thaiLotteryData';

import { registerInAuthOnly as registerInAuthOnlyService, sendPasswordResetLink as sendPasswordResetLinkService } from '../services/userService';

export async function registerInAuthOnly(email: string, passwordInput: string): Promise<string> {
  return registerInAuthOnlyService(email, passwordInput, cachedUsers);
}

export async function syncFirebaseAuth(email: string, passwordInput?: string) {
  // Now managed reactively via onAuthStateChanged and direct logins.
  console.log(`[FirebaseAuth] syncFirebaseAuth called for ${email} (handled by onAuthStateChanged).`);
}

export async function checkInternetConnection(): Promise<boolean> {
  if (!navigator.onLine) {
    return false;
  }

  const endpoints = [
    'https://www.google.com',
    'https://1.1.1.1',
    'https://api.github.com'
  ];

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      // 'no-cors' mode ensures the request completes successfully without throwing CORS errors,
      // while true network/offline failures will still correctly throw an exception.
      await fetch(url, { 
        method: 'HEAD', 
        mode: 'no-cors', 
        cache: 'no-store', 
        signal: controller.signal 
      });
      
      clearTimeout(timeoutId);
      return true;
    } catch (e) {
      // Fallback to the next endpoint if one fails
    }
  }

  return false;
}

// Standard storage keys for local preferences


const DEFAULT_DEADLINES: DrawDeadline[] = [
  {
    id: 'pakistan_bond_15000_114',
    drawId: 'pakistan_bond_15000_114',
    category: 'pakistan_bond',
    titleUrdu: 'پاکستان پرائز بانڈ بکنگ کھل گئی ہے',
    deadlineIso: '2026-08-16T18:00',
    status: 'open',
    bookingStatusUrdu: 'بکنگ کھول گئی',
    nextPrizeBondValue: 'Rs. 15000',
    nextDrawCity: 'Karachi',
    nextDrawNumber: '114',
    nextDrawDate: '16-08-2026'
  },
  {
    id: 'thailand_lottery_20260817',
    drawId: 'thailand_lottery_20260817',
    category: 'thailand_lottery',
    titleUrdu: 'تھائی لینڈ ڈرا بکنگ کھل گئی ہے',
    deadlineIso: '2026-08-17T12:00',
    status: 'open',
    bookingStatusUrdu: 'بکنگ کھول گئی',
    nextDrawDate: '17-08-2026'
  }
];

const DEFAULT_USERS: User[] = [
  {
    email: 'mastermaindqureshi110@gmail.com',
    name: 'ایڈمن قریشی صاحب',
    phone: '03453090146',
    city: 'لاہور',
    balance: 500000,
    isAdmin: true,
    role: 'superAdmin'
  },
  {
    email: 'mastermaind.qureshi110@gmail.com',
    name: 'ایڈمن قریشی صاحب ڈاٹ',
    phone: '03453090147',
    city: 'لاہور',
    balance: 500000,
    isAdmin: true,
    role: 'superAdmin'
  },
  {
    email: 'fareed.ghulam@gmail.com',
    name: 'غلام فرید',
    phone: '03157891234',
    city: 'ملتان',
    balance: 15000,
    isAdmin: true,
    role: 'dataEntryAdmin'
  }
];






// Memory caches
let cachedUsers: User[] = [];
let cachedBookings: Booking[] = [];
let cachedLimits: NumberLimit[] = [];
let cachedDemands: Demand[] = [];
let cachedDeadlines: DrawDeadline[] = [];
let cachedTransactions: Transaction[] = [];
let cachedSupportWhatsApp = '923453090146';
let cachedAdminEmail = 'mastermaind.qureshi110@gmail.com';

const listeners: Set<() => void> = new Set();
let started = false;

export function subscribeToStore(callback: () => void): () => void {
  listeners.add(callback);
  // Trigger once immediately
  callback();
  return () => {
    listeners.delete(callback);
  };
}

function notifyListeners() {
  listeners.forEach(cb => {
    try {
      cb();
    } catch (e) {
      console.error("Error in store listener:", e);
    }
  });
}

export function isLoggedUserAdminOrSuper(): boolean {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return false;
  
  // 1. Direct search by UID
  const user = cachedUsers.find(u => u.uid === firebaseUser.uid);
  if (user) {
    return user.role === 'superAdmin' || user.role === 'admin' || user.isAdmin === true;
  }
  
  // 2. Fallback search by email
  const email = firebaseUser.email?.toLowerCase().trim();
  if (email) {
    const userByEmail = cachedUsers.find(u => (u.email || '').toLowerCase() === email);
    return !!(userByEmail && (userByEmail.role === 'superAdmin' || userByEmail.role === 'admin' || userByEmail.isAdmin === true));
  }
  return false;
}

export function isLoggedUserDataEntry(): boolean {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return false;
  
  // 1. Direct search by UID
  const user = cachedUsers.find(u => u.uid === firebaseUser.uid);
  if (user) {
    return user.role === 'dataEntryAdmin';
  }
  
  // 2. Fallback search by email
  const email = firebaseUser.email?.toLowerCase().trim();
  if (email) {
    const userByEmail = cachedUsers.find(u => (u.email || '').toLowerCase() === email);
    return !!(userByEmail && userByEmail.role === 'dataEntryAdmin');
  }
  return false;
}

export function initializeStore() {
  if (started) return;
  started = true;
  
  // Set local helper default keys if not set
  if (!localStorage.getItem('mqe_admin_configured_email')) {
    localStorage.setItem('mqe_admin_configured_email', 'mastermaind.qureshi110@gmail.com');
  }
  if (!localStorage.getItem('mqe_whatsapp_number')) {
    localStorage.setItem('mqe_whatsapp_number', '923453090146');
  }

  // A. Listen to Auth State dynamically
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const email = firebaseUser.email;
      const uid = firebaseUser.uid;
      if (email) {
        const normalized = email.toLowerCase().trim();
        // Look up user role dynamically
        let userProfile = cachedUsers.find(u => u.uid === uid);
        if (!userProfile) {
          try {
            const docRef = doc(db, 'users', uid);
            const userDoc = await getDocFromServer(docRef);
            if (userDoc.exists()) {
              userProfile = userDoc.data() as User;
            }
          } catch (e) {
            console.error("Failed to fetch user role on auth state change:", e);
          }
        }
        
        const isSuper = userProfile && (userProfile.role === 'superAdmin' || userProfile.role === 'admin');
        const isDataEntry = userProfile && userProfile.role === 'dataEntryAdmin';
        
        if (isSuper || isDataEntry) {
          sessionStorage.setItem('admin_verified', 'true');
        }
      }
    } else {
      sessionStorage.removeItem('admin_verified');
    }
    notifyListeners();
  });

  // 1. Listen to users
  onSnapshot(collection(db, 'users'), (snapshot) => {
    if (snapshot.empty) {
      cachedUsers = [];
      notifyListeners();
    } else {
      const tempUsers = snapshot.docs.map(doc => {
        const data = doc.data() as User;
        const uid = doc.id;
        const mappedUser: User = {
          ...data,
          uid: data.uid || uid,
        };

        // Ensure email is always present and valid
        if (!mappedUser.email) {
          if (uid.includes('@')) {
            mappedUser.email = uid;
          } else {
            mappedUser.email = '';
          }
        }

        // SECURITY: Admin privileges come ONLY from the Firestore role.
        // Email addresses must NEVER grant admin privileges.
        const isSuper = data.role === 'superAdmin' || data.role === 'admin';
        const isDataEntry = data.role === 'dataEntryAdmin';

        if (isSuper) {
          mappedUser.isAdmin = true;
          mappedUser.role = 'superAdmin';
        } else if (isDataEntry) {
          mappedUser.isAdmin = true;
          mappedUser.role = 'dataEntryAdmin';
        } else {
          mappedUser.isAdmin = data.isAdmin || false;
          mappedUser.role = data.role || 'customer';
        }

        const isComplete = data.profileCompleted === true || (Boolean(mappedUser.name?.trim()) && Boolean(mappedUser.phone?.trim()) && Boolean(mappedUser.city?.trim()));
        mappedUser.profileCompleted = isComplete;

        return mappedUser;
      });

      // Filter out duplicate profiles prioritizing true UID docs over legacy email ones
      const emailMap = new Map<string, User>();
      tempUsers.forEach(u => {
        const emailLower = (u.email || '').toLowerCase().trim();
        if (!emailLower) return;
        const existing = emailMap.get(emailLower);
        if (!existing) {
          emailMap.set(emailLower, u);
        } else {
          if (existing.uid?.includes('@') && !u.uid?.includes('@')) {
            emailMap.set(emailLower, u);
          }
        }
      });
      cachedUsers = Array.from(emailMap.values());
      notifyListeners();
    }
  }, (error) => {
    // Non-admin users cannot read all users; single user document listener handles their profile
    console.log("[UsersCollection] Collection listener restricted for non-admin user (using document listener):", error.message);
  });

  // Active single-user document listener for real-time customer profile & balance sync
  let activeUserUnsub: (() => void) | null = null;
  onAuthStateChanged(auth, (firebaseUser) => {
    if (activeUserUnsub) {
      activeUserUnsub();
      activeUserUnsub = null;
    }

    if (firebaseUser) {
      const uid = firebaseUser.uid;
      const email = firebaseUser.email || '';
      const emailLower = email.toLowerCase().trim();
      const isSuperAdminEmail = emailLower === 'mastermaind.qureshi110@gmail.com';
      const isDataEntryEmail = emailLower === 'fareed.ghulam@gmail.com';

      const userDocRef = doc(db, 'users', uid);
      
      activeUserUnsub = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as User;
          const userObj: User = {
            ...data,
            uid: data.uid || uid,
            email: data.email || firebaseUser.email || ''
          };
          // SECURITY: Administrative privileges come ONLY from Firestore role.
          // Email addresses must NEVER grant admin or data-entry access.
          const isSuper = data.role === 'superAdmin' || data.role === 'admin';
          const isDataEntry = data.role === 'dataEntryAdmin';
          if (isSuper) {
            userObj.isAdmin = true;
            userObj.role = 'superAdmin';
          } else if (isDataEntry) {
            userObj.isAdmin = true;
            userObj.role = 'dataEntryAdmin';
          } else {
            userObj.isAdmin = data.isAdmin || false;
            userObj.role = data.role || 'customer';
          }

          const isComplete = data.profileCompleted === true || (Boolean(userObj.name?.trim()) && Boolean(userObj.phone?.trim()) && Boolean(userObj.city?.trim()));
          userObj.profileCompleted = isComplete;

          const idx = cachedUsers.findIndex(u => u.uid === uid || (u.email && userObj.email && u.email.toLowerCase() === userObj.email.toLowerCase()));
          if (idx !== -1) {
            cachedUsers[idx] = userObj;
          } else {
            cachedUsers.push(userObj);
          }
          try {
            localStorage.setItem('mqe_cached_user_profile', JSON.stringify(userObj));
          } catch (e) {
            // Ignore storage quota errors
          }
          notifyListeners();
        } else {
          console.warn(`[UserSync] Profile document users/${uid} not found yet.`);
        }
      }, (err) => {
        console.error(`[UserSync] Error listening to user document ${uid}:`, err);
      });
    }
  });

  // 2. Listen to bookings
  onSnapshot(collection(db, 'bookings'), (snapshot) => {
    if (snapshot.empty) {
      cachedBookings = [];
      notifyListeners();
    } else {
      const list = snapshot.docs.map(doc => doc.data() as Booking);
      cachedBookings = list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      notifyListeners();
    }
  });

  // 3. Listen to limits
  onSnapshot(collection(db, 'limits'), (snapshot) => {
    if (snapshot.empty) {
cachedLimits = [];
        notifyListeners();
    } else {
      cachedLimits = snapshot.docs.map(doc => doc.data() as NumberLimit);
      notifyListeners();
    }
  });

  // 4. Listen to demands
  onSnapshot(collection(db, 'demands'), (snapshot) => {
    const list = snapshot.docs.map(doc => doc.data() as Demand);
    cachedDemands = list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    notifyListeners();
  });

  // 5. Listen to deadlines
  onSnapshot(collection(db, 'deadlines'), (snapshot) => {
    if (snapshot.empty) {
      cachedDeadlines = [];
      notifyListeners();
    } else {
      cachedDeadlines = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as DrawDeadline) }));
      notifyListeners();
    }
  });

  // 5.5. Listen to transactions
  onSnapshot(collection(db, 'transactions'), (snapshot) => {
    const list = snapshot.docs.map(doc => doc.data() as Transaction);
    cachedTransactions = list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    notifyListeners();
  });

  // 6. Listen to settings/general
  onSnapshot(doc(db, 'settings', 'general'), async (snapshot) => {
    if (!snapshot.exists()) {
      if (isLoggedUserAdminOrSuper()) {
        try {
          await setDoc(doc(db, 'settings', 'general'), {
            adminEmail: 'mastermaind.qureshi110@gmail.com',
            whatsappNumber: '923453090146'
          });
        } catch (e) {
          console.error("Failed to seed default settings:", e);
        }
      }
    } else {
      const data = snapshot.data();
      const adminEmail = data?.adminEmail || 'mastermaind.qureshi110@gmail.com';
      cachedAdminEmail = adminEmail;
      cachedSupportWhatsApp = data?.whatsappNumber || '923453090146';
      notifyListeners();
    }
  });

  // 7. Listen to pakistanBondResults (with auto-migration)
  onSnapshot(collection(db, 'pakistanBondResults'), (snapshot) => {
    if (snapshot.empty) {
      if (isLoggedUserAdminOrSuper() || isLoggedUserDataEntry()) {
        console.log("Migrating Pakistan Bond results to Firestore...");
        // Filter out empty mock data if they have already been cleared, to prevent overwriting
        if (pakistanBondDraws && pakistanBondDraws.length > 0) {
          pakistanBondDraws.forEach(async (draw) => {
            let bondValue = "Rs. 200";
            let drawNoOnly = "";
            
            const bondMatch = draw.drawNo.match(/\(بانڈ\s+([^)]+)\)/);
            if (bondMatch) bondValue = bondMatch[1];
            
            const drawNoMatch = draw.drawNo.match(/ڈرا نمبر\s+(\d+)/);
            if (drawNoMatch) drawNoOnly = drawNoMatch[1];
            
            const resultDoc: PakistanBondResult = {
              id: draw.id,
              category: 'pakistan_bond',
              bondValue,
              drawNoOnly,
              drawNo: draw.drawNo,
              date: draw.date,
              city: draw.city,
              firstPrize: draw.firstPrize,
              secondPrizes: draw.secondPrizes
            };
            try {
              await setDoc(doc(db, 'pakistanBondResults', draw.id), resultDoc);
            } catch (e) {
              console.error("Failed to migrate pakistanBondResult doc:", e);
            }
          });
        }
      }
    } else {
      cachedPakistanBondResults = snapshot.docs.map(doc => doc.data() as PakistanBondResult);
      notifyListeners();
    }
  });

  // 8. Listen to thaiLotteryResults (with auto-migration)
  onSnapshot(collection(db, 'thaiLotteryResults'), (snapshot) => {
    if (snapshot.empty) {
      if (isLoggedUserAdminOrSuper() || isLoggedUserDataEntry()) {
        console.log("Migrating Thai Lottery results to Firestore...");
        if (thaiHistoricalDraws && thaiHistoricalDraws.length > 0) {
          thaiHistoricalDraws.forEach(async (draw) => {
            const firstPrize = draw.firstPrize || '';
            const last2Digits = firstPrize.length >= 2 ? firstPrize.substring(firstPrize.length - 2) : '';
            const front3Digits = firstPrize.length >= 3 ? firstPrize.substring(0, 3) : '';
            const back3Digits = firstPrize.length >= 3 ? firstPrize.substring(firstPrize.length - 3) : '';
            
            const resultDoc: ThaiLotteryResult = {
              id: draw.id,
              category: 'thailand_lottery',
              drawNo: draw.drawNo,
              date: draw.date,
              city: draw.city || 'بنکاک',
              firstPrize: draw.firstPrize,
              secondPrizes: draw.secondPrizes || [],
              last2Digits,
              front3Digits,
              back3Digits
            };
            try {
              await setDoc(doc(db, 'thaiLotteryResults', draw.id), resultDoc);
            } catch (e) {
              console.error("Failed to migrate thaiLotteryResult doc:", e);
            }
          });
        }
      }
    } else {
      cachedThaiLotteryResults = snapshot.docs.map(doc => doc.data() as ThaiLotteryResult);
      notifyListeners();
    }
  });

}

export function getSupportWhatsAppNumber(): string {
  return cachedSupportWhatsApp;
}

export function setSupportWhatsAppNumber(num: string) {
  let cleaned = num.replace(/[\s-+]/g, '');
  if (cleaned.startsWith('03')) {
    cleaned = '92' + cleaned.substring(1);
  }
  setDoc(doc(db, 'settings', 'general'), {
    adminEmail: cachedAdminEmail,
    whatsappNumber: cleaned
  }, { merge: true });
}

export function getUsers(): User[] {
  return cachedUsers;
}

export function saveUsers(users: User[]) {
  users.forEach(u => {
    let targetUid = u.uid;
    if (!targetUid) {
      const cached = cachedUsers.find(x => x.email.toLowerCase() === u.email.toLowerCase());
      targetUid = cached?.uid;
    }
    if (targetUid) {
      setDoc(doc(db, 'users', targetUid), { ...u, uid: targetUid });
    } else {
      console.warn("Skipping save for user without UID:", u.email);
    }
  });
}

export function getBookings(): Booking[] {
  return cachedBookings;
}

export function saveBookings(bookings: Booking[]) {
  bookings.forEach(b => {
    setDoc(doc(db, 'bookings', b.id), b);
  });
}

export function getNumberLimits(): NumberLimit[] {
  return cachedLimits;
}

export function saveNumberLimits(limits: NumberLimit[]) {
  limits.forEach(l => {
    setDoc(doc(db, 'limits', l.id), l);
  });
}

export function getLoggedInUser(): User | null {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;
  const emailLower = firebaseUser.email?.toLowerCase().trim() || '';
  let user = cachedUsers.find((u) => u.uid === firebaseUser.uid || (emailLower && u.email && u.email.toLowerCase().trim() === emailLower)) || null;

  if (user) {
    // SECURITY: Admin privileges come ONLY from the Firestore user profile.
    // Do NOT grant admin access based on email address.
    const isSuper = user.role === 'superAdmin' || user.role === 'admin';
    const isDataEntry = user.role === 'dataEntryAdmin';

    const isComplete = user.profileCompleted === true || (Boolean(user.name?.trim()) && Boolean(user.phone?.trim()) && Boolean(user.city?.trim()));

    if (isSuper) {
      return {
        ...user,
        isAdmin: true,
        role: 'superAdmin',
        profileCompleted: isComplete
      };
    }
    if (isDataEntry) {
      return {
        ...user,
        isAdmin: true,
        role: 'dataEntryAdmin',
        profileCompleted: isComplete
      };
    }
    return {
      ...user,
      profileCompleted: isComplete
    };
  }
  
  return null;
}

export function setLoggedInUser(emailOrUid: string) {
  const clean = emailOrUid.toLowerCase().trim();
  const user = cachedUsers.find((u) => (u.email || '').toLowerCase() === clean || u.uid === emailOrUid);
  const isSuper = user && (user.role === 'superAdmin' || user.role === 'admin');
  const isDataEntry = user && (user.role === 'dataEntryAdmin');

  // SECURITY: Admin session is granted ONLY from the verified Firestore role.
  // Never grant admin access based on an email address.
  if (user && (user.isAdmin || isSuper || isDataEntry)) {
    sessionStorage.setItem('admin_verified', 'true');
  } else {
    sessionStorage.removeItem('admin_verified');
  }
  notifyListeners();
}

export function logout() {
  sessionStorage.removeItem('admin_verified');
  try {
    localStorage.removeItem('mqe_cached_user_profile');
  } catch (e) {
    // Ignore
  }
  signOut(auth).catch((e) => console.error("Firebase signOut failed:", e));
  notifyListeners();
}

export function getAdminConfiguredEmail(): string {
  return cachedAdminEmail;
}

export function setAdminConfiguredEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  
  setDoc(doc(db, 'settings', 'general'), {
    adminEmail: normalizedEmail,
    whatsappNumber: cachedSupportWhatsApp
  }, { merge: true });
  
  const user = cachedUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (user && user.uid) {
    setDoc(doc(db, 'users', user.uid), {
      ...user,
      isAdmin: true,
      role: 'admin'
    });
  }
}

export async function updateUserPassword(email: string, passwordInput: string): Promise<boolean> {
  const online = await checkInternetConnection();
  if (!online) return false;

  const normalizedEmail = email.toLowerCase().trim();
  const emailsToUpdate = [normalizedEmail];

  try {
    if (auth.currentUser && auth.currentUser.email?.toLowerCase().trim() === normalizedEmail) {
      await updatePassword(auth.currentUser, passwordInput);
      console.log(`[FirebaseAuth] Successfully updated password via Auth API for currently logged in admin: ${normalizedEmail}`);
    } else {
      await sendPasswordResetEmail(auth, normalizedEmail);
      console.log(`[FirebaseAuth] Sent password reset link to: ${normalizedEmail} (since they are a different user)`);
    }

    for (const em of emailsToUpdate) {
      const cached = cachedUsers.find(u => u.email.toLowerCase() === em);
      if (cached?.uid) {
        // Store profile updates only, DO NOT store plain-text passwords
        await setDoc(doc(db, 'users', cached.uid), {
          isAdmin: true
        }, { merge: true });
      } else {
        console.warn(`Could not update admin role in Firestore for ${em} because no UID was found.`);
      }
    }
    return true;
  } catch (e: any) {
    console.error("Error updating user password:", e);
    if (e && e.code === 'auth/requires-recent-login') {
      alert('اس آپریشن کے لیے دوبارہ لاگ ان کرنے کی ضرورت ہے۔ (This operation requires re-authentication. Please log out and log in again.)');
    }
    return false;
  }
}

export async function changeLoggedAdminPassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'انٹرنیٹ کنکشن دستیاب نہیں ہے۔ (No internet connection.)' };
  }

  const user = auth.currentUser;
  if (!user || !user.email) {
    return { success: false, error: 'صارف لاگ ان نہیں ہے۔ (User is not logged in.)' };
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (e: any) {
    console.error("Error changing admin password:", e);
    if (e && e.code === 'auth/wrong-password') {
      return { success: false, error: 'موجودہ پاس ورڈ درست نہیں ہے۔ (Current password is incorrect.)' };
    } else if (e && e.code === 'auth/invalid-credential') {
      return { success: false, error: 'موجودہ پاس ورڈ درست نہیں ہے۔ (Current password is incorrect.)' };
    } else if (e && e.code === 'auth/weak-password') {
      return { success: false, error: 'نیا پاس ورڈ کم از کم 6 ہندسوں کا ہونا ضروری ہے۔ (New password must be at least 6 characters.)' };
    }
    return { success: false, error: e?.message || 'پاس ورڈ تبدیل کرنے میں خرابی پیش آئی۔' };
  }
}

export async function updateCustomerPassword(email: string, passwordInput: string): Promise<boolean> {
  const online = await checkInternetConnection();
  if (!online) return false;

  const normalizedEmail = email.toLowerCase().trim();
  try {
    if (auth.currentUser && auth.currentUser.email?.toLowerCase().trim() === normalizedEmail) {
      await updatePassword(auth.currentUser, passwordInput);
    } else {
      await sendPasswordResetEmail(auth, normalizedEmail);
    }
    const cached = cachedUsers.find(u => u.email.toLowerCase() === normalizedEmail);
    if (cached?.uid) {
      // Profile metadata merge only, DO NOT store plain-text passwords
      await setDoc(doc(db, 'users', cached.uid), {
        email: normalizedEmail
      }, { merge: true });
    } else {
      console.warn(`Could not update customer metadata in Firestore for ${normalizedEmail} because no UID was found.`);
    }
    return true;
  } catch (e: any) {
    console.error("Error updating customer password:", e);
    return false;
  }
}

// Business actions
export async function registerUser(name: string, phone: string, city: string, email: string, password: string): Promise<User | null> {
  const online = await checkInternetConnection();
  if (!online) {
    return null;
  }
  const normalizedEmail = email.toLowerCase().trim();

  // SECURITY: Normal registration can NEVER create an Admin account.
  // Administrative roles must be assigned separately by an authorized Admin.
  const isAdmin = false;
  
  try {
    // 1. Create account in Firebase Authentication
    const cred = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
    const uid = cred.user.uid;

    const newUser: User = {
      uid,
      email: normalizedEmail,
      name: name.trim(),
      phone: phone.trim(),
      city: city.trim(),
      balance: 0, // production starting balance = 0
      isAdmin,
      role: isAdmin ? 'admin' : 'customer',
      profileCompleted: true
    };

    // Write profile information to Firestore with UID key
    await setDoc(doc(db, 'users', uid), newUser);

    // Update in-memory cachedUsers list instantly
    const existingIdx = cachedUsers.findIndex(u => u.uid === uid || u.email.toLowerCase() === normalizedEmail);
    if (existingIdx !== -1) {
      cachedUsers[existingIdx] = newUser;
    } else {
      cachedUsers.push(newUser);
    }
    try {
      localStorage.setItem('mqe_cached_user_profile', JSON.stringify(newUser));
    } catch (e) {
      // Ignore
    }
    notifyListeners();

    return newUser;
  } catch (e: any) {
    console.error("Error in registerUser:", e);
    return null;
  }
}

export async function signInWithGoogle(): Promise<{ success: boolean; user?: User; isNewOrIncomplete?: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'انٹرنیٹ کنکشن دستیاب نہیں ہے۔ براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں۔' };
  }

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;
    if (!firebaseUser || !firebaseUser.email) {
      return { success: false, error: 'گوگل اکاؤنٹ کی معلومات حاصل نہیں ہو سکیں۔' };
    }

    const uid = firebaseUser.uid;
    const email = firebaseUser.email.toLowerCase().trim();
    const photoURL = firebaseUser.photoURL || '';

    const userRef = doc(db, 'users', uid);
    const userDoc = await getDocFromServer(userRef);

    let userProfile: User;
    let isNewOrIncomplete = false;

    if (userDoc.exists()) {
      const data = userDoc.data() as User;
      const isComplete = data.profileCompleted === true || (Boolean(data.phone?.trim()) && Boolean(data.city?.trim()));
      userProfile = {
        ...data,
        uid,
        email,
        photoURL: photoURL || data.photoURL || '',
        profileCompleted: isComplete
      };
      if (photoURL && data.photoURL !== photoURL) {
        await setDoc(userRef, { photoURL }, { merge: true });
      }
      if (!isComplete) {
        isNewOrIncomplete = true;
      }
    } else {
      // SECURITY: A new Google account is ALWAYS a customer.
      // Admin/Data Entry roles must already exist in the Firestore profile.
      userProfile = {
        uid,
        email,
        name: firebaseUser.displayName || 'گوگل صارف',
        phone: '',
        city: '',
        photoURL,
        balance: 0,
        isAdmin: false,
        role: 'customer',
        profileCompleted: false
      };
      await setDoc(userRef, userProfile);
      isNewOrIncomplete = true;
    }

    try {
      localStorage.setItem('mqe_cached_user_profile', JSON.stringify(userProfile));
    } catch (e) {
      // Ignore
    }
    notifyListeners();
    return { success: true, user: userProfile, isNewOrIncomplete };
  } catch (err: any) {
    console.error("Google sign in error:", err);
    if (err && err.code === 'auth/popup-closed-by-user') {
      return { success: false, error: 'گوگل لاگ ان منسوخ کر دیا گیا ہے۔' };
    }
    return { success: false, error: err?.message || 'گوگل سائن ان کے دوران غلطی پیش آئی۔' };
  }
}

export function getTransactions(): Transaction[] {
  return cachedTransactions;
}

export function getUserTransactions(userEmailOrUid: string): Transaction[] {
  const clean = userEmailOrUid.toLowerCase().trim();
  return cachedTransactions.filter(
    t => t.userEmail.toLowerCase().trim() === clean || t.userId === userEmailOrUid
  );
}

export async function requestRecharge(
  userEmail: string,
  userName: string,
  amount: number,
  paymentMethod: string,
  accountDetails: string,
  note?: string
): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'انٹرنیٹ کنکشن دستیاب نہیں ہے۔' };

  if (amount <= 0) {
    return { success: false, error: 'براہ کرم درست رقم درج کریں۔' };
  }

  const normalizedEmail = userEmail.toLowerCase().trim();
  const cached = cachedUsers.find(u => u.email.toLowerCase() === normalizedEmail);

  const txId = 'tx-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const tx: Transaction = {
    id: txId,
    userId: cached?.uid || '',
    userEmail: normalizedEmail,
    userName: userName || cached?.name || 'صارف',
    type: 'recharge',
    amount,
    date: new Date().toISOString(),
    status: 'pending',
    paymentMethod,
    accountDetails,
    note: note || 'والٹ ریچارج کی درخواست'
  };

  try {
    await setDoc(doc(db, 'transactions', txId), tx);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'درخواست بھیجنے میں غلطی پیش آئی۔' };
  }
}

export async function requestWithdrawal(
  userEmail: string,
  userName: string,
  amount: number,
  paymentMethod: string,
  accountDetails: string,
  note?: string
): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'انٹرنیٹ کنکشن دستیاب نہیں ہے۔' };

  if (amount <= 0) {
    return { success: false, error: 'براہ کرم درست رقم درج کریں۔' };
  }

  const normalizedEmail = userEmail.toLowerCase().trim();
  const cached = cachedUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!cached) return { success: false, error: 'صارف کا ریکارڈ نہیں ملا۔' };

  if (cached.balance < amount) {
    return { success: false, error: 'آپ کے والٹ میں اتنی رقم موجود نہیں ہے۔' };
  }

  const txId = 'tx-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const tx: Transaction = {
    id: txId,
    userId: cached.uid || '',
    userEmail: normalizedEmail,
    userName: userName || cached.name || 'صارف',
    type: 'withdrawal',
    amount,
    date: new Date().toISOString(),
    status: 'pending',
    paymentMethod,
    accountDetails,
    note: note || 'والٹ سے رقم نکلوانے (Withdrawal) کی درخواست'
  };

  try {
    await setDoc(doc(db, 'transactions', txId), tx);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'درخواست بھیجنے میں غلطی پیش آئی۔' };
  }
}

export async function approveTransaction(transactionId: string): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'انٹرنیٹ کنکشن دستیاب نہیں ہے۔' };

  const tx = cachedTransactions.find(t => t.id === transactionId);
  if (!tx) return { success: false, error: 'ٹرانزیکشن نہیں ملی۔' };

  if (tx.status !== 'pending') {
    return { success: false, error: 'یہ ٹرانزیکشن پہلے ہی پراسیس ہو چکی ہے۔' };
  }

  const cachedUser = cachedUsers.find(u => u.email.toLowerCase() === tx.userEmail.toLowerCase());
  if (!cachedUser || !cachedUser.uid) {
    return { success: false, error: 'صارف کا UID نہیں ملا۔' };
  }

  const userRef = doc(db, 'users', cachedUser.uid);
  const txRef = doc(db, 'transactions', transactionId);

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error('صارف ریکارڈ موجود نہیں ہے');

      const userData = userDoc.data() as User;
      let newBalance = userData.balance;

      if (tx.type === 'recharge') {
        newBalance = userData.balance + tx.amount;
      } else if (tx.type === 'withdrawal') {
        if (userData.balance < tx.amount) {
          throw new Error('صارف کے پاس کافی بیلنس نہیں ہے');
        }
        newBalance = userData.balance - tx.amount;
      }

      transaction.update(userRef, { balance: newBalance });
      transaction.update(txRef, { status: 'approved' });
    });

    return { success: true };
  } catch (err: any) {
    console.error("Approve transaction failed:", err);
    return { success: false, error: err.message || 'منظوری کے دوران غلطی پیش آئی۔' };
  }
}

export async function rejectTransaction(transactionId: string): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'انٹرنیٹ کنکشن دستیاب نہیں ہے۔' };

  const tx = cachedTransactions.find(t => t.id === transactionId);
  if (!tx) return { success: false, error: 'ٹرانزیکشن نہیں ملی۔' };

  try {
    await setDoc(doc(db, 'transactions', transactionId), {
      status: 'rejected'
    }, { merge: true });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'رد کرنے کے دوران غلطی پیش آئی۔' };
  }
}

export async function updateUserProfile(
  uid: string,
  updatedData: { name: string; phone: string; city: string; photoURL?: string }
): Promise<{ success: boolean; message: string }> {
  const online = await checkInternetConnection();
  if (!online) {
    return {
      success: false,
      message: 'انٹرنیٹ کنکشن دستیاب نہیں ہے۔ براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں۔'
    };
  }

  const name = updatedData.name.trim();
  const phone = updatedData.phone.trim();
  const city = updatedData.city.trim();
  const photoURL = updatedData.photoURL?.trim() || '';

  if (!name) {
    return { success: false, message: 'نام درج کرنا لازمی ہے۔' };
  }
  if (name.length < 2 || name.length > 100) {
    return { success: false, message: 'نام 2 سے 100 حروف کے درمیان ہونا چاہیے۔' };
  }

  if (!phone) {
    return { success: false, message: 'موبائل نمبر درج کرنا لازمی ہے۔' };
  }
  const phoneRegex = /^[\d\+\-\s]{10,20}$/;
  if (!phoneRegex.test(phone)) {
    return { success: false, message: 'براہ کرم درست فون نمبر درج کریں۔ (مثلاً: 03001234567)' };
  }

  if (!city) {
    return { success: false, message: 'شہر کا نام درج کرنا لازمی ہے۔' };
  }
  if (city.length > 50) {
    return { success: false, message: 'شہر کا نام 50 حروف سے زیادہ نہیں ہو سکتا۔' };
  }

  if (!uid) {
    return { success: false, message: 'صارف کی شناخت (UID) موجود نہیں ہے۔' };
  }

  try {
    const userRef = doc(db, 'users', uid);
    const existingUser = cachedUsers.find(u => u.uid === uid);
    const userEmail = existingUser?.email || auth.currentUser?.email || '';

    const updatePayload: any = {
      uid,
      email: userEmail,
      name,
      phone,
      city,
      profileCompleted: true
    };
    if (photoURL) {
      updatePayload.photoURL = photoURL;
    }

    await setDoc(userRef, updatePayload, { merge: true });

    // Instantly sync local memory state and notify listeners
    if (existingUser) {
      existingUser.name = name;
      existingUser.phone = phone;
      existingUser.city = city;
      existingUser.profileCompleted = true;
      if (photoURL) existingUser.photoURL = photoURL;
      try {
        localStorage.setItem('mqe_cached_user_profile', JSON.stringify(existingUser));
      } catch (e) {
        // Ignore
      }
    } else {
      const newUserObj: User = {
        uid,
        email: userEmail,
        name,
        phone,
        city,
        balance: 0,
        photoURL,
        isAdmin: false,
        role: 'customer',
        profileCompleted: true
      };
      cachedUsers.push(newUserObj);
      try {
        localStorage.setItem('mqe_cached_user_profile', JSON.stringify(newUserObj));
      } catch (e) {
        // Ignore
      }
    }
    notifyListeners();

    return {
      success: true,
      message: 'آپ کی پروفائل کامیابی سے اپ ڈیٹ ہو گئی ہے۔'
    };
  } catch (error: any) {
    console.error('Error updating user profile in Firestore:', error);
    return {
      success: false,
      message: 'پروفائل اپ ڈیٹ کرتے وقت ایک خطاء پیش آئی: ' + (error?.message || 'نامعلوم غلطی')
    };
  }
}

export async function rechargeWallet(
  email: string, 
  amount: number,
  note?: string
): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'انٹرنیٹ کنکشن موجود نہیں ہے۔' };

  const normalizedEmail = email.toLowerCase().trim();
  if (!normalizedEmail) {
    return { success: false, error: 'ای میل ایڈریس صحیح نہیں ہے۔' };
  }

  // 1. Try finding in cachedUsers
  let cached = cachedUsers.find(u => (u.email || '').toLowerCase().trim() === normalizedEmail);

  let targetUid = cached?.uid;
  let targetName = cached?.name || 'صارف';
  let targetBalance = cached?.balance || 0;

  // 2. Fallback: Query Firestore directly for users collection if not found in memory
  if (!targetUid) {
    try {
      const q = query(collection(db, 'users'), where('email', '==', normalizedEmail));
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        const userDoc = querySnap.docs[0];
        const data = userDoc.data() as User;
        targetUid = data.uid || userDoc.id;
        targetName = data.name || 'صارف';
        targetBalance = data.balance || 0;
      }
    } catch (err) {
      console.error("[rechargeWallet] Firestore user query failed:", err);
    }
  }

  // 3. Fallback: Try document with normalizedEmail as key
  if (!targetUid) {
    try {
      const emailDocRef = doc(db, 'users', normalizedEmail);
      const emailDocSnap = await getDocFromServer(emailDocRef);
      if (emailDocSnap.exists()) {
        const data = emailDocSnap.data() as User;
        targetUid = data.uid || normalizedEmail;
        targetName = data.name || 'صارف';
        targetBalance = data.balance || 0;
      }
    } catch (err) {
      // Ignore
    }
  }

  if (!targetUid) {
    console.error(`[rechargeWallet] Recharge failed: Customer ${normalizedEmail} has no valid firebase UID loaded.`);
    return { success: false, error: 'اس ای میل کے ساتھ کوئی رجسٹرڈ کسٹمر نہیں ملا۔' };
  }

  // Check insufficient balance if deducting
  if (amount < 0 && (targetBalance + amount < 0)) {
    return { 
      success: false, 
      error: `کسٹمر کے پاس کافی بیلنس نہیں ہے۔ موجودہ بیلنس: Rs. ${targetBalance.toLocaleString()}` 
    };
  }
  
  const userRef = doc(db, 'users', targetUid);
  const txId = 'tx-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const txRef = doc(db, 'transactions', txId);

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw new Error('کسٹمر کا اکاؤنٹ Firestore میں نہیں ملا۔');
      }
      const user = userDoc.data() as User;
      const currentBal = user.balance ?? 0;

      if (amount < 0 && (currentBal + amount < 0)) {
        throw new Error(`کسٹمر کا بیلنس منفی نہیں ہو سکتا۔ موجودہ بیلنس: Rs. ${currentBal.toLocaleString()}`);
      }

      const newBal = currentBal + amount;
      transaction.update(userRef, {
        balance: newBal
      });

      const defaultNote = amount >= 0 ? 'ایڈمن کی جانب سے والٹ ریچارج' : 'ایڈمن کی جانب سے والٹ سے کٹوتی';

      const tx: Transaction = {
        id: txId,
        userId: targetUid!,
        userEmail: normalizedEmail,
        userName: user.name || targetName,
        type: amount >= 0 ? 'recharge' : 'withdrawal',
        amount: Math.abs(amount),
        date: new Date().toISOString(),
        status: 'approved',
        paymentMethod: 'ایڈمن والٹ چارج',
        note: note && note.trim() ? note.trim() : defaultNote
      };
      transaction.set(txRef, tx);
    });

    if (cached) {
      cached.balance = (cached.balance || 0) + amount;
    }
    notifyListeners();
    return { success: true };
  } catch (e: any) {
    console.error("Recharge transaction failed:", e);
    return { 
      success: false, 
      error: e?.message || 'والٹ ٹرانزیکشن میں خرابی پیش آئی۔' 
    };
  }
}

export async function addBooking(
  email: string,
  category: DrawCategory,
  number: string,
  firstAmount: number,
  secondAmount: number,
  bondValue?: string,
  drawNumber?: string,
  drawDate?: string,
  drawCity?: string,
  drawId?: string
): Promise<{ success: boolean; error?: string }> {
  if (!drawId || !drawId.trim()) {
    return { success: false, error: 'اس بکنگ کے لیے ڈرا منتخب نہیں کیا گیا۔' };
  }

  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'NO_INTERNET' };
  }

  const normalizedEmail = email.toLowerCase().trim();
  const cached = cachedUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!cached || !cached.uid) {
    return { success: false, error: 'کسٹمر ریکارڈ نہیں ملا' };
  }
  const uid = cached.uid;
  const userRef = doc(db, 'users', uid);
  const bookingId = 'booking-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const bookingRef = doc(db, 'bookings', bookingId);
  const txId = 'tx-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const txRef = doc(db, 'transactions', txId);
  const totalCost = firstAmount + secondAmount;

  try {
    const result = await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw new Error('کسٹمر ریکارڈ نہیں ملا');
      }
      const userData = userDoc.data() as User;

      if (userData.balance < totalCost) {
        throw new Error('آپ کے والٹ میں کافی رقم موجود نہیں ہے');
      }

      const limit = cachedLimits.find(l =>
      l.category === category &&
      l.number === number &&
      l.drawId === drawId
    );
      if (limit) {
        if (firstAmount > limit.maxAmount) {
          throw new Error(`اس نمبر (${number}) کے لئے فرسٹ کی انفرادی حد Rs. ${limit.maxAmount} ہے`);
        }
        if (secondAmount > limit.maxAmount) {
          throw new Error(`اس نمبر (${number}) کے لئے سیکنڈ کی انفرادی حد Rs. ${limit.maxAmount} ہے`);
        }
      }

      const newBooking: Booking = {
        id: bookingId,
        userId: uid,
        userEmail: normalizedEmail,
        category,
        number,
        firstAmount,
        secondAmount,
        timestamp: new Date().toISOString(),
        drawId,
        ...(bondValue && { bondValue }),
        ...(drawNumber && { drawNumber }),
        ...(drawCity && { drawCity }),
        ...(drawDate && { drawDate })
      };

      const categoryLabelMap: Record<DrawCategory, string> = {
        pakistan_bond: 'پاکستان پرائز بانڈ',
        thailand_lottery: 'تھائی لینڈ لاٹری'
      };

      const tx: Transaction = {
        id: txId,
        userId: uid,
        userEmail: normalizedEmail,
        userName: userData.name || 'صارف',
        type: 'booking_deduction',
        amount: totalCost,
        date: new Date().toISOString(),
        status: 'approved',
        note: `${categoryLabelMap[category]} نمبر #${number} بکنگ کٹوتی`
      };

      transaction.set(bookingRef, newBooking);
      transaction.set(txRef, tx);
      transaction.update(userRef, {
        balance: userData.balance - totalCost
      });

      return { success: true };
    });
    return result;
  } catch (err: any) {
    console.error("Booking transaction failed:", err);
    return { success: false, error: err.message || 'بکنگ کے دوران غلطی پیش آئی۔' };
  }
}

export async function cancelBooking(bookingId: string): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'NO_INTERNET' };
  }

  const booking = cachedBookings.find(b => b.id === bookingId);
  if (!booking) return { success: false, error: 'بکنگ کا ریکارڈ نہیں ملا' };

  const timeDiffMs = Date.now() - new Date(booking.timestamp).getTime();
  const limitMs = 2 * 60 * 1000;

  if (timeDiffMs > limitMs) {
    return { success: false, error: 'کینسل کرنے کا وقت (2 منٹ) ختم ہو چکا ہے' };
  }

  const userEmail = booking.userEmail.toLowerCase().trim();
  const cached = cachedUsers.find(u => u.email.toLowerCase() === userEmail);
  if (!cached || !cached.uid) {
    return { success: false, error: 'کسٹمر ریکارڈ (یا یو آئی ڈی) نہیں ملا۔' };
  }
  const userRef = doc(db, 'users', cached.uid);
  const bookingRef = doc(db, 'bookings', bookingId);
  const refundAmount = booking.firstAmount + booking.secondAmount;

  try {
    const result = await runTransaction(db, async (transaction) => {
      const bookingDoc = await transaction.get(bookingRef);
      if (!bookingDoc.exists()) {
        throw new Error('یہ بکنگ پہلے ہی منسوخ ہو چکی ہے۔');
      }
      const userDoc = await transaction.get(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        transaction.update(userRef, {
          balance: userData.balance + refundAmount
        });
      }
      transaction.delete(bookingRef);
      return { success: true };
    });
    return result;
  } catch (err: any) {
    console.error("Cancel booking transaction failed:", err);
    return { success: false, error: err.message || 'منسوخی کے دوران غلطی پیش آئی۔' };
  }
}

export async function cancelBookingByAdmin(bookingId: string): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'NO_INTERNET' };
  }

  const booking = cachedBookings.find(b => b.id === bookingId);
  if (!booking) return { success: false, error: 'بکنگ کا ریکارڈ نہیں ملا' };

  const userEmail = booking.userEmail.toLowerCase().trim();
  const cached = cachedUsers.find(u => u.email.toLowerCase() === userEmail);
  if (!cached || !cached.uid) {
    return { success: false, error: 'کسٹمر ریکارڈ (یا یو آئی ڈی) نہیں ملا۔' };
  }
  const userRef = doc(db, 'users', cached.uid);
  const bookingRef = doc(db, 'bookings', bookingId);
  const refundAmount = booking.firstAmount + booking.secondAmount;

  try {
    const result = await runTransaction(db, async (transaction) => {
      const bookingDoc = await transaction.get(bookingRef);
      if (!bookingDoc.exists()) {
        throw new Error('یہ بکنگ پہلے ہی منسوخ ہو چکی ہے۔');
      }
      const userDoc = await transaction.get(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        transaction.update(userRef, {
          balance: userData.balance + refundAmount
        });
      }
      transaction.delete(bookingRef);
      return { success: true };
    });
    return result;
  } catch (err: any) {
    console.error("Admin cancel booking transaction failed:", err);
    return { success: false, error: err.message || 'منسوخی کے دوران غلطی پیش آئی۔' };
  }
}

export async function setOrUpdateLimit(category: DrawCategory, number: string, maxAmount: number, drawId?: string): Promise<void> {
  if (!drawId || !drawId.trim()) {
    console.error('Cannot save limit without drawId');
    return;
  }

  const online = await checkInternetConnection();
  if (!online) return;

  const existing = cachedLimits.find(l =>
    l.category === category &&
    l.number === number &&
    l.drawId === drawId
  );
  const limitId = existing ? existing.id : 'limit-' + Date.now();
  
  const limit: NumberLimit = {
    id: limitId,
    category,
    number,
    maxAmount,
    drawId
  };
  await setDoc(doc(db, 'limits', limitId), limit);

  const idx = cachedLimits.findIndex(l => l.id === limitId);
  if (idx !== -1) {
    cachedLimits[idx] = limit;
  } else {
    cachedLimits.push(limit);
  }
  notifyListeners();
}

export async function deleteLimit(id: string): Promise<void> {
  const online = await checkInternetConnection();
  if (!online) return;
  await deleteDoc(doc(db, 'limits', id));

  cachedLimits = cachedLimits.filter(l => l.id !== id);
  notifyListeners();
}

export function getDemands(): Demand[] {
  return cachedDemands;
}

export async function saveDemands(demands: Demand[]): Promise<void> {
  const online = await checkInternetConnection();
  if (!online) return;
  for (const d of demands) {
    await setDoc(doc(db, 'demands', d.id), d);
  }
}

export async function addDemand(
  email: string,
  category: DrawCategory,
  number: string,
  firstAmount: number,
  secondAmount: number,
  bondValue?: string,
  drawNumber?: string,
  drawDate?: string,
  drawCity?: string,
  drawId?: string
): Promise<{ success: boolean; error?: string }> {
  if (!drawId || !drawId.trim()) {
    return { success: false, error: 'اس ڈیمانڈ کے لیے ڈرا منتخب نہیں کیا گیا۔' };
  }
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'NO_INTERNET' };
  }

  const normalizedEmail = email.toLowerCase();
  const user = cachedUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) return { success: false, error: 'کسٹمر ریکارڈ نہیں ملا' };

  const totalCost = firstAmount + secondAmount;
  if (user.balance < totalCost) {
    return { success: false, error: 'آپ کے والٹ میں کافی رقم موجود نہیں ہے' };
  }

  const demandId = 'demand-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const newDemand: Demand = {
    id: demandId,
    userEmail: normalizedEmail,
    category,
    number,
    firstAmount,
    secondAmount,
    timestamp: new Date().toISOString(),
    status: 'pending',
    drawId,
    ...(bondValue && { bondValue }),
    ...(drawNumber && { drawNumber }),
    ...(drawCity && { drawCity }),
    ...(drawDate && { drawDate })
  };

  try {
    await setDoc(doc(db, 'demands', demandId), newDemand);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'ڈیمانڈ بھیجنے کے دوران غلطی پیش آئی۔' };
  }
}

export async function approveDemand(demandId: string): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'NO_INTERNET' };
  }

  const demand = cachedDemands.find(d => d.id === demandId);
  if (!demand) return { success: false, error: 'ڈیمانڈ ریکارڈ نہیں ملا' };

  if (!demand.drawId || !demand.drawId.trim()) {
    return { success: false, error: 'اس ڈیمانڈ کے ساتھ ڈرا منتخب نہیں ہے۔' };
  }

  if (demand.status !== 'pending') {
    return { success: false, error: 'یہ ڈیمانڈ پہلے ہی عمل میں لائی جا چکی ہے' };
  }

  const userEmail = demand.userEmail.toLowerCase().trim();
  const cached = cachedUsers.find(u => u.email.toLowerCase() === userEmail);
  if (!cached || !cached.uid) {
    return { success: false, error: 'کسٹمر ریکارڈ (یا یو آئی ڈی) نہیں ملا۔' };
  }
  const userRef = doc(db, 'users', cached.uid);
  const bookingId = 'booking-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const bookingRef = doc(db, 'bookings', bookingId);
  const demandRef = doc(db, 'demands', demandId);
  const totalCost = demand.firstAmount + demand.secondAmount;

  try {
    const result = await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw new Error('کسٹمر ریکارڈ نہیں ملا');
      }
      const userData = userDoc.data() as User;

      if (userData.balance < totalCost) {
        throw new Error('کسٹمر کے والٹ میں کافی رقم موجود نہیں ہے');
      }

      const newBooking: Booking = {
        id: bookingId,
        userId: cached.uid,
        userEmail: demand.userEmail,
        category: demand.category,
        number: demand.number,
        firstAmount: demand.firstAmount,
        secondAmount: demand.secondAmount,
        timestamp: new Date().toISOString(),
        ...(demand.drawId && { drawId: demand.drawId }),
        ...(demand.bondValue && { bondValue: demand.bondValue }),
        ...(demand.drawNumber && { drawNumber: demand.drawNumber }),
        ...(demand.drawCity && { drawCity: demand.drawCity }),
        ...(demand.drawDate && { drawDate: demand.drawDate })
      };

      transaction.set(bookingRef, newBooking);
      transaction.update(userRef, {
        balance: userData.balance - totalCost
      });
      transaction.update(demandRef, {
        status: 'approved'
      });

      return { success: true };
    });
    return result;
  } catch (err: any) {
    console.error("Approve demand transaction failed:", err);
    return { success: false, error: err.message || 'ڈیمانڈ منظور کرنے کے دوران غلطی پیش آئی۔' };
  }
}

export async function rejectDemand(demandId: string): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'NO_INTERNET' };
  }

  const demand = cachedDemands.find(d => d.id === demandId);
  if (!demand) return { success: false, error: 'ڈیمانڈ ریکارڈ نہیں ملا' };

  if (demand.status !== 'pending') {
    return { success: false, error: 'یہ ڈیمانڈ پہلے ہی عمل میں لائی جا چکی ہے' };
  }

  try {
    await setDoc(doc(db, 'demands', demandId), {
      ...demand,
      status: 'rejected'
    });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'ڈیمانڈ مسترد کرنے کے دوران غلطی پیش آئی۔' };
  }
}

export function getDrawDeadlines(): DrawDeadline[] {
  return cachedDeadlines;
}

export async function saveDrawDeadlines(deadlines: DrawDeadline[]): Promise<void> {
  const online = await checkInternetConnection();
  if (!online) return;
  for (const d of deadlines) {
    const targetId = d.id || d.category;
    await setDoc(doc(db, 'deadlines', targetId), { ...d, id: targetId });
  }
}

export async function setDrawDeadline(
  category: DrawCategory,
  deadlineIso: string,
  titleUrdu: string,
  status: 'open' | 'closed' | 'result_announced',
  nextPrizeBondValue?: string,
  nextDrawCity?: string,
  nextDrawNumber?: string,
  nextDrawDate?: string,
  drawId?: string,
  bookingStatusUrdu?: 'بکنگ کھول گئی' | 'بکنگ بند ہے'
): Promise<void> {
  const online = await checkInternetConnection();
  if (!online) return;

  const targetDocId = drawId || (category === 'pakistan_bond' ? `pb_draw_${Date.now()}` : `th_draw_${Date.now()}`);
  const existing = cachedDeadlines.find(d => (d.id || d.drawId || d.category) === targetDocId);
  const now = new Date().toISOString();

  const deadline: DrawDeadline = {
    id: targetDocId,
    drawId: targetDocId,
    category,
    deadlineIso,
    titleUrdu,
    status,
    bookingStatusUrdu: bookingStatusUrdu || (status === 'closed' ? 'بکنگ بند ہے' : 'بکنگ کھول گئی'),
    ...(nextPrizeBondValue !== undefined && { nextPrizeBondValue }),
    ...(nextDrawCity !== undefined && { nextDrawCity }),
    ...(nextDrawNumber !== undefined && { nextDrawNumber }),
    ...(nextDrawDate !== undefined && { nextDrawDate }),
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
  await setDoc(doc(db, 'deadlines', targetDocId), deadline);

  const idx = cachedDeadlines.findIndex(d => (d.id || d.drawId || d.category) === targetDocId);
  if (idx !== -1) {
    cachedDeadlines[idx] = deadline;
  } else {
    cachedDeadlines.push(deadline);
  }
  notifyListeners();
}

export async function deleteDrawDeadline(id: string): Promise<void> {
  const online = await checkInternetConnection();
  if (!online) return;
  await deleteDoc(doc(db, 'deadlines', id));
  cachedDeadlines = cachedDeadlines.filter(d => d.id !== id);
  notifyListeners();
}

// Memory caches for results
let cachedPakistanBondResults: PakistanBondResult[] = [];
let cachedThaiLotteryResults: ThaiLotteryResult[] = [];

export function getPakistanBondResults(): PakistanBondResult[] {
  return cachedPakistanBondResults;
}

export function getThaiLotteryResults(): ThaiLotteryResult[] {
  return cachedThaiLotteryResults;
}

export async function autoCleanOldDrawData(category: 'pakistan_bond' | 'thailand_lottery', targetDrawId?: string): Promise<void> {
  try {
    console.log(`Starting auto archiving for completed draw data of category: ${category}, drawId: ${targetDrawId || 'all'}`);
    
    // 1. Archive bookings of this draw/category
    const bookingsRef = collection(db, 'bookings');
    const bookingsQuery = targetDrawId 
      ? query(bookingsRef, where('drawId', '==', targetDrawId))
      : query(bookingsRef, where('category', '==', category));
    const bookingsSnapshot = await getDocs(bookingsQuery);
    
    for (const d of bookingsSnapshot.docs) {
      await updateDoc(doc(db, 'bookings', d.id), { isArchived: true });
    }
    console.log(`Archived ${bookingsSnapshot.size} bookings for category ${category}`);

    // 2. Archive demands of this draw/category
    const demandsRef = collection(db, 'demands');
    const demandsQuery = targetDrawId
      ? query(demandsRef, where('drawId', '==', targetDrawId))
      : query(demandsRef, where('category', '==', category));
    const demandsSnapshot = await getDocs(demandsQuery);

    for (const d of demandsSnapshot.docs) {
      await updateDoc(doc(db, 'demands', d.id), { isArchived: true });
    }

    // 3. Archive number limits of this draw/category
    const limitsRef = collection(db, 'limits');
    const limitsQuery = targetDrawId
      ? query(limitsRef, where('drawId', '==', targetDrawId))
      : query(limitsRef, where('category', '==', category));
    const limitsSnapshot = await getDocs(limitsQuery);
    
    for (const d of limitsSnapshot.docs) {
      await updateDoc(doc(db, 'limits', d.id), { isArchived: true });
    }

    // 4. Mark draw/deadline status as result_announced and isArchived: true
    if (targetDrawId) {
      const deadlineRef = doc(db, 'deadlines', targetDrawId);
      await updateDoc(deadlineRef, { status: 'result_announced', isArchived: true });
    } else {
      const deadlinesRef = collection(db, 'deadlines');
      const deadlinesQuery = query(deadlinesRef, where('category', '==', category));
      const deadlinesSnapshot = await getDocs(deadlinesQuery);
      for (const d of deadlinesSnapshot.docs) {
        await updateDoc(doc(db, 'deadlines', d.id), { status: 'result_announced', isArchived: true });
      }
    }
  } catch (err) {
    console.error("Auto archiving of completed draw data failed:", err);
  }
}

export async function addResult(result: AllResultType): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'NO_INTERNET' };

  if (result.category === 'pakistan_bond') {
    const pb = result as PakistanBondResult;
    const exists = cachedPakistanBondResults.some(
      r => r.bondValue.toLowerCase().replace(/[\s,.]+/g, '') === pb.bondValue.toLowerCase().replace(/[\s,.]+/g, '') &&
           r.drawNoOnly.trim() === pb.drawNoOnly.trim()
    );
    if (exists) {
      return {
        success: false,
        error: `اس بانڈ مالیت (${pb.bondValue}) اور ڈرا نمبر (${pb.drawNoOnly}) کا نتیجہ پہلے ہی موجود ہے۔`
      };
    }
  } else {
    const tl = result as ThaiLotteryResult;
    const exists = cachedThaiLotteryResults.some(
      r => r.drawNo.trim().toLowerCase() === tl.drawNo.trim().toLowerCase()
    );
    if (exists) {
      return {
        success: false,
        error: `تھائی لاٹری ڈرا (${tl.drawNo}) کا نتیجہ پہلے ہی موجود ہے۔`
      };
    }
  }

  try {
    const colName = result.category === 'pakistan_bond' ? 'pakistanBondResults' : 'thaiLotteryResults';
    await setDoc(doc(db, colName, result.id), result);
    // Archive completed draw data automatically
    await autoCleanOldDrawData(result.category, result.drawId);
    return { success: true };
  } catch (err: any) {
    console.error("Add result failed:", err);
    return { success: false, error: err.message || 'قرعہ اندازی کا نتیجہ محفوظ کرنے میں غلطی پیش آئی۔' };
  }
}

export async function editResult(result: AllResultType): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'NO_INTERNET' };

  try {
    const colName = result.category === 'pakistan_bond' ? 'pakistanBondResults' : 'thaiLotteryResults';
    await setDoc(doc(db, colName, result.id), result, { merge: true });
    // Archive completed draw data automatically
    await autoCleanOldDrawData(result.category, result.drawId);
    return { success: true };
  } catch (err: any) {
    console.error("Edit result failed:", err);
    return { success: false, error: err.message || 'قرعہ اندازی کا نتیجہ ترمیم کرنے میں غلطی پیش آئی۔' };
  }
}

export async function deleteResult(id: string, category: 'pakistan_bond' | 'thailand_lottery'): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'NO_INTERNET' };

  try {
    const colName = category === 'pakistan_bond' ? 'pakistanBondResults' : 'thaiLotteryResults';
    await deleteDoc(doc(db, colName, id));
    return { success: true };
  } catch (err: any) {
    console.error("Delete result failed:", err);
    return { success: false, error: err.message || 'قرعہ اندازی کا نتیجہ حذف کرنے میں غلطی پیش آئی۔' };
  }
}

export async function sendPasswordResetLink(email: string): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'انٹرنیٹ کنکشن دستیاب نہیں ہے۔' };

  return sendPasswordResetLinkService(email);
}
