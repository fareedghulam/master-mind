import { User, Booking, NumberLimit, Demand, DrawDeadline, PakistanBondResult, ThaiLotteryResult, AllResultType } from '../types';
import { db, auth, firebaseConfig } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  runTransaction,
  getDocFromServer
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
  reauthenticateWithCredential
} from 'firebase/auth';
import { pakistanBondDraws } from './pakistanBondData';
import { thaiHistoricalDraws } from './thaiLotteryData';

export async function registerInAuthOnly(email: string, passwordInput: string): Promise<void> {
  const secondaryAppName = `SecondaryAuth_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
  const secondaryAuth = getAuth(secondaryApp);
  try {
    await createUserWithEmailAndPassword(secondaryAuth, email.toLowerCase().trim(), passwordInput);
    console.log(`[FirebaseAuth] Registered user ${email} in Auth successfully.`);
  } catch (err: any) {
    if (err && err.code === 'auth/email-already-in-use') {
      console.log(`[FirebaseAuth] User ${email} already exists in Auth.`);
    } else {
      console.error(`[FirebaseAuth] Error in registerInAuthOnly for ${email}:`, err);
      throw err;
    }
  } finally {
    await deleteApp(secondaryApp);
  }
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
    category: 'pakistan_bond',
    titleUrdu: 'بکنگ فائنل کھل گئی ہے',
    deadlineIso: '2026-08-30T18:00',
    status: 'open'
  },
  {
    category: 'thailand_lottery',
    titleUrdu: 'بکنگ فائنل کھل گئی ہے',
    deadlineIso: '2026-09-02T12:00',
    status: 'open'
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
  },
  {
    email: 'customer@test.com',
    name: 'محمد علی',
    phone: '03214567890',
    city: 'کراچی',
    balance: 3200,
    isAdmin: false,
    role: 'customer'
  }
];

const DEFAULT_LIMITS: NumberLimit[] = [
  {
    id: 'limit-1',
    category: 'pakistan_bond',
    number: '786',
    maxAmount: 25
  },
  {
    id: 'limit-2',
    category: 'pakistan_bond',
    number: '007',
    maxAmount: 50
  },
  {
    id: 'limit-3',
    category: 'thailand_lottery',
    number: '143',
    maxAmount: 100
  }
];

const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'booking-mock-1',
    userEmail: 'fareed.ghulam@gmail.com',
    category: 'pakistan_bond',
    number: '456',
    firstAmount: 100,
    secondAmount: 50,
    timestamp: new Date(Date.now() - 45000).toISOString()
  },
  {
    id: 'booking-mock-2',
    userEmail: 'fareed.ghulam@gmail.com',
    category: 'thailand_lottery',
    number: '999',
    firstAmount: 300,
    secondAmount: 300,
    timestamp: new Date(Date.now() - 300000).toISOString()
  }
];

// Memory caches
let cachedUsers: User[] = [];
let cachedBookings: Booking[] = [];
let cachedLimits: NumberLimit[] = [];
let cachedDemands: Demand[] = [];
let cachedDeadlines: DrawDeadline[] = [];
let cachedSupportWhatsApp = '923453090146';
let cachedAdminEmail = 'mastermaindqureshi110@gmail.com';

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
  const email = auth.currentUser?.email?.toLowerCase().trim();
  if (!email) return false;
  if (email === 'mastermaindqureshi110@gmail.com' || email === 'mastermaind.qureshi110@gmail.com') {
    return true;
  }
  const user = cachedUsers.find(u => u.email.toLowerCase() === email);
  return !!(user && (user.role === 'superAdmin' || user.role === 'admin'));
}

export function isLoggedUserDataEntry(): boolean {
  const email = auth.currentUser?.email?.toLowerCase().trim();
  if (!email) return false;
  const user = cachedUsers.find(u => u.email.toLowerCase() === email);
  return !!(user && user.role === 'dataEntryAdmin');
}

export function initializeStore() {
  if (started) return;
  started = true;
  
  // Set local helper default keys if not set
  if (!localStorage.getItem('mqe_admin_configured_email')) {
    localStorage.setItem('mqe_admin_configured_email', 'mastermaindqureshi110@gmail.com');
  }
  if (!localStorage.getItem('mqe_whatsapp_number')) {
    localStorage.setItem('mqe_whatsapp_number', '923453090146');
  }

  // A. Listen to Auth State dynamically
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const email = firebaseUser.email;
      if (email) {
        const normalized = email.toLowerCase().trim();
        // Look up user role dynamically
        let userProfile = cachedUsers.find(u => u.email.toLowerCase() === normalized);
        if (!userProfile) {
          try {
            const docRef = doc(db, 'users', normalized);
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

  // B. Seed default accounts in Firebase Auth and perform safe Firestore role migration
  const seedAndMigrateDefaultUsers = async () => {
    const defaultUsersToSeed = [
      { email: 'mastermaindqureshi110@gmail.com', password: '123456', role: 'superAdmin', name: 'ایڈمن قریشی صاحب' },
      { email: 'mastermaind.qureshi110@gmail.com', password: '123456', role: 'superAdmin', name: 'ایڈمن قریشی صاحب ڈاٹ' },
      { email: 'fareed.ghulam@gmail.com', password: '123456', role: 'dataEntryAdmin', name: 'غلام فرید' },
      { email: 'customer@test.com', password: '123456', role: 'customer', name: 'محمد علی' }
    ];

    for (const item of defaultUsersToSeed) {
      try {
        await registerInAuthOnly(item.email, item.password);
      } catch (err) {
        // Ignored if user already exists
      }

      // Safe Firestore role migration/verification
      try {
        const docRef = doc(db, 'users', item.email);
        const userDoc = await getDocFromServer(docRef);
        if (userDoc.exists()) {
          const data = userDoc.data() as User;
          if (data.role !== item.role || data.isAdmin !== (item.role !== 'customer')) {
            if (isLoggedUserAdminOrSuper()) {
              await setDoc(docRef, {
                role: item.role,
                isAdmin: item.role !== 'customer'
              }, { merge: true });
              console.log(`[Migration] Migrated role/isAdmin for ${item.email} safely.`);
            } else {
              console.log(`[Migration] Skip migrating role/isAdmin for ${item.email} (not admin).`);
            }
          }
        } else {
          await setDoc(docRef, {
            email: item.email,
            name: item.name,
            phone: item.email === 'fareed.ghulam@gmail.com' ? '03157891234' : '03453090146',
            city: item.email === 'fareed.ghulam@gmail.com' ? 'ملتان' : 'لاہور',
            balance: item.email === 'fareed.ghulam@gmail.com' ? 15000 : 500000,
            isAdmin: item.role !== 'customer',
            role: item.role
          });
          console.log(`[Migration] Created profile for: ${item.email}`);
        }
      } catch (err) {
        console.error(`[Migration] Error migrating database doc for ${item.email}:`, err);
      }
    }
  };
  seedAndMigrateDefaultUsers();

  // 1. Listen to users
  onSnapshot(collection(db, 'users'), (snapshot) => {
    if (snapshot.empty) {
      DEFAULT_USERS.forEach(async (user) => {
        try {
          await setDoc(doc(db, 'users', user.email.toLowerCase()), user);
        } catch (e) {
          console.error("Failed to seed default user doc:", e);
        }
      });
    } else {
      cachedUsers = snapshot.docs.map(doc => {
        const data = doc.data() as User;
        
        const isSuper = (
          data.role === 'superAdmin' ||
          data.role === 'admin'
        );

        const isDataEntry = (
          data.role === 'dataEntryAdmin'
        );

        if (isSuper) {
          return {
            ...data,
            isAdmin: true,
            role: 'superAdmin'
          };
        } else if (isDataEntry) {
          return {
            ...data,
            isAdmin: true,
            role: 'dataEntryAdmin'
          };
        }
        return {
          ...data,
          isAdmin: data.isAdmin || false,
          role: data.role || 'customer'
        };
      });
      notifyListeners();
    }
  });

  // 2. Listen to bookings
  onSnapshot(collection(db, 'bookings'), (snapshot) => {
    if (snapshot.empty) {
      if (isLoggedUserAdminOrSuper()) {
        DEFAULT_BOOKINGS.forEach(async (booking) => {
          try {
            await setDoc(doc(db, 'bookings', booking.id), booking);
          } catch (e) {
            console.error("Failed to seed default booking:", e);
          }
        });
      }
    } else {
      const list = snapshot.docs.map(doc => doc.data() as Booking);
      cachedBookings = list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      notifyListeners();
    }
  });

  // 3. Listen to limits
  onSnapshot(collection(db, 'limits'), (snapshot) => {
    if (snapshot.empty) {
      if (isLoggedUserAdminOrSuper()) {
        DEFAULT_LIMITS.forEach(async (limit) => {
          try {
            await setDoc(doc(db, 'limits', limit.id), limit);
          } catch (e) {
            console.error("Failed to seed default limit:", e);
          }
        });
      }
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
      if (isLoggedUserAdminOrSuper()) {
        DEFAULT_DEADLINES.forEach(async (deadline) => {
          try {
            await setDoc(doc(db, 'deadlines', deadline.category), deadline);
          } catch (e) {
            console.error("Failed to seed default deadline:", e);
          }
        });
      }
    } else {
      cachedDeadlines = snapshot.docs.map(doc => doc.data() as DrawDeadline);
      notifyListeners();
    }
  });

  // 6. Listen to settings/general
  onSnapshot(doc(db, 'settings', 'general'), async (snapshot) => {
    if (!snapshot.exists()) {
      if (isLoggedUserAdminOrSuper()) {
        try {
          await setDoc(doc(db, 'settings', 'general'), {
            adminEmail: 'mastermaindqureshi110@gmail.com',
            whatsappNumber: '923453090146'
          });
        } catch (e) {
          console.error("Failed to seed default settings:", e);
        }
      }
    } else {
      const data = snapshot.data();
      let adminEmail = data?.adminEmail || 'mastermaindqureshi110@gmail.com';
      if (adminEmail === 'mastermaind.qureshi110@gmail.com') {
        adminEmail = 'mastermaindqureshi110@gmail.com';
        if (isLoggedUserAdminOrSuper()) {
          try {
            // Auto-migrate in Firestore
            await setDoc(doc(db, 'settings', 'general'), { adminEmail }, { merge: true });
          } catch (e) {
            console.error("Failed to migrate adminEmail in settings:", e);
          }
        }
      }
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
    setDoc(doc(db, 'users', u.email.toLowerCase()), u);
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
  if (!firebaseUser || !firebaseUser.email) return null;
  const normalizedEmail = firebaseUser.email.toLowerCase().trim();
  const user = cachedUsers.find((u) => u.email.toLowerCase() === normalizedEmail) || null;
  
  if (user && (user.isAdmin || user.role === 'superAdmin' || user.role === 'admin' || user.role === 'dataEntryAdmin')) {
    if (sessionStorage.getItem('admin_verified') === 'true') {
      return {
        ...user,
        isAdmin: true,
        role: user.role === 'dataEntryAdmin' ? 'dataEntryAdmin' : 'superAdmin'
      };
    }
    return null;
  }
  return user;
}

export function setLoggedInUser(email: string) {
  const normalizedEmail = email.toLowerCase().trim();
  const user = cachedUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  const isSuper = user && (user.role === 'superAdmin' || user.role === 'admin');
  const isDataEntry = user && (user.role === 'dataEntryAdmin');

  if (user && (user.isAdmin || isSuper || isDataEntry)) {
    sessionStorage.setItem('admin_verified', 'true');
  }
  notifyListeners();
}

export function logout() {
  sessionStorage.removeItem('admin_verified');
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
  if (user) {
    setDoc(doc(db, 'users', normalizedEmail), {
      ...user,
      isAdmin: true,
      role: 'admin'
    });
  } else {
    setDoc(doc(db, 'users', normalizedEmail), {
      email: normalizedEmail,
      name: 'ایڈمن قریشی صاحب',
      phone: '03453090146',
      city: 'لاہور',
      balance: 500000,
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
  if (normalizedEmail === 'mastermaindqureshi110@gmail.com' || normalizedEmail === 'mastermaind.qureshi110@gmail.com') {
    if (!emailsToUpdate.includes('mastermaindqureshi110@gmail.com')) emailsToUpdate.push('mastermaindqureshi110@gmail.com');
    if (!emailsToUpdate.includes('mastermaind.qureshi110@gmail.com')) emailsToUpdate.push('mastermaind.qureshi110@gmail.com');
  }

  try {
    if (auth.currentUser && auth.currentUser.email?.toLowerCase().trim() === normalizedEmail) {
      await updatePassword(auth.currentUser, passwordInput);
      console.log(`[FirebaseAuth] Successfully updated password via Auth API for currently logged in admin: ${normalizedEmail}`);
    } else {
      await sendPasswordResetEmail(auth, normalizedEmail);
      console.log(`[FirebaseAuth] Sent password reset link to: ${normalizedEmail} (since they are a different user)`);
    }

    for (const em of emailsToUpdate) {
      // Store profile updates only, DO NOT store plain-text passwords
      await setDoc(doc(db, 'users', em), {
        isAdmin: true
      }, { merge: true });
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
    // Profile metadata merge only, DO NOT store plain-text passwords
    await setDoc(doc(db, 'users', normalizedEmail), {
      email: normalizedEmail
    }, { merge: true });
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
  const existing = cachedUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return existing;
  }
  const isAdmin = normalizedEmail === cachedAdminEmail.toLowerCase();
  const newUser: User = {
    email: normalizedEmail,
    name,
    phone,
    city,
    balance: 100, // starting balance
    isAdmin,
    role: isAdmin ? 'admin' : 'customer'
  };
  try {
    // 1. Create account in Firebase Authentication
    await createUserWithEmailAndPassword(auth, normalizedEmail, password);
    // 2. Write profile information to Firestore
    await setDoc(doc(db, 'users', normalizedEmail), newUser);
    return newUser;
  } catch (e) {
    console.error("Error in registerUser:", e);
    return null;
  }
}

export async function rechargeWallet(email: string, amount: number): Promise<boolean> {
  const online = await checkInternetConnection();
  if (!online) return false;

  const normalizedEmail = email.toLowerCase();
  const userRef = doc(db, 'users', normalizedEmail);

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw new Error('کسٹمر ریکارڈ نہیں ملا');
      }
      const user = userDoc.data() as User;
      transaction.update(userRef, {
        balance: user.balance + amount
      });
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function addBooking(
  email: string,
  category: 'pakistan_bond' | 'thailand_lottery',
  number: string,
  firstAmount: number,
  secondAmount: number
): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'NO_INTERNET' };
  }

  const normalizedEmail = email.toLowerCase();
  const userRef = doc(db, 'users', normalizedEmail);
  const bookingId = 'booking-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const bookingRef = doc(db, 'bookings', bookingId);
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

      const limit = cachedLimits.find(l => l.category === category && l.number === number);
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
        userEmail: normalizedEmail,
        category,
        number,
        firstAmount,
        secondAmount,
        timestamp: new Date().toISOString()
      };

      transaction.set(bookingRef, newBooking);
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

  const userEmail = booking.userEmail.toLowerCase();
  const userRef = doc(db, 'users', userEmail);
  const bookingRef = doc(db, 'bookings', bookingId);
  const refundAmount = booking.firstAmount + booking.secondAmount;

  try {
    const result = await runTransaction(db, async (transaction) => {
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

  const userEmail = booking.userEmail.toLowerCase();
  const userRef = doc(db, 'users', userEmail);
  const bookingRef = doc(db, 'bookings', bookingId);
  const refundAmount = booking.firstAmount + booking.secondAmount;

  try {
    const result = await runTransaction(db, async (transaction) => {
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

export async function setOrUpdateLimit(category: 'pakistan_bond' | 'thailand_lottery', number: string, maxAmount: number): Promise<void> {
  const online = await checkInternetConnection();
  if (!online) return;

  const existing = cachedLimits.find(l => l.category === category && l.number === number);
  const limitId = existing ? existing.id : 'limit-' + Date.now();
  
  const limit: NumberLimit = {
    id: limitId,
    category,
    number,
    maxAmount
  };
  await setDoc(doc(db, 'limits', limitId), limit);
}

export async function deleteLimit(id: string): Promise<void> {
  const online = await checkInternetConnection();
  if (!online) return;
  await deleteDoc(doc(db, 'limits', id));
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
  category: 'pakistan_bond' | 'thailand_lottery',
  number: string,
  firstAmount: number,
  secondAmount: number
): Promise<{ success: boolean; error?: string }> {
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
    status: 'pending'
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

  if (demand.status !== 'pending') {
    return { success: false, error: 'یہ ڈیمانڈ پہلے ہی عمل میں لائی جا چکی ہے' };
  }

  const userEmail = demand.userEmail.toLowerCase();
  const userRef = doc(db, 'users', userEmail);
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
        userEmail: demand.userEmail,
        category: demand.category,
        number: demand.number,
        firstAmount: demand.firstAmount,
        secondAmount: demand.secondAmount,
        timestamp: new Date().toISOString()
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
    await setDoc(doc(db, 'deadlines', d.category), d);
  }
}

export async function setDrawDeadline(
  category: 'pakistan_bond' | 'thailand_lottery',
  deadlineIso: string,
  titleUrdu: string,
  status: 'open' | 'closed'
): Promise<void> {
  const online = await checkInternetConnection();
  if (!online) return;

  const deadline: DrawDeadline = {
    category,
    deadlineIso,
    titleUrdu,
    status
  };
  await setDoc(doc(db, 'deadlines', category), deadline);
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

  try {
    await sendPasswordResetEmail(auth, email.toLowerCase().trim());
    return { success: true };
  } catch (err: any) {
    console.error("Password reset error:", err);
    return { success: false, error: err.message || 'پاس ورڈ دوبارہ ترتیب دینے کی ای میل بھیجنے میں خرابی پیش آئی۔' };
  }
}
