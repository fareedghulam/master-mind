import { User, Booking, NumberLimit, Demand, DrawDeadline } from '../types';
import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  runTransaction
} from 'firebase/firestore';

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
const LOGGED_IN_EMAIL_KEY = 'mqe_logged_in_email';

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
    role: 'admin'
  },
  {
    email: 'fareed.ghulam@gmail.com',
    name: 'غلام فرید',
    phone: '03157891234',
    city: 'ملتان',
    balance: 15000,
    isAdmin: false
  },
  {
    email: 'customer@test.com',
    name: 'محمد علی',
    phone: '03214567890',
    city: 'کراچی',
    balance: 3200,
    isAdmin: false
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

  // 1. Listen to users
  onSnapshot(collection(db, 'users'), (snapshot) => {
    if (snapshot.empty) {
      DEFAULT_USERS.forEach(async (user) => {
        await setDoc(doc(db, 'users', user.email.toLowerCase()), user);
      });
    } else {
      cachedUsers = snapshot.docs.map(doc => {
        const data = doc.data() as User;
        const emailLower = data.email.toLowerCase().trim();
        const configLower = cachedAdminEmail.toLowerCase().trim();
        if (
          data.isAdmin || 
          data.role === 'admin' ||
          emailLower === configLower || 
          emailLower === 'mastermaind.qureshi110@gmail.com' || 
          emailLower === 'mastermaindqureshi110@gmail.com'
        ) {
          return {
            ...data,
            isAdmin: true,
            role: 'admin'
          };
        }
        return {
          ...data,
          role: data.role || 'customer'
        };
      });
      notifyListeners();
    }
  });

  // 2. Listen to bookings
  onSnapshot(collection(db, 'bookings'), (snapshot) => {
    if (snapshot.empty) {
      DEFAULT_BOOKINGS.forEach(async (booking) => {
        await setDoc(doc(db, 'bookings', booking.id), booking);
      });
    } else {
      const list = snapshot.docs.map(doc => doc.data() as Booking);
      cachedBookings = list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      notifyListeners();
    }
  });

  // 3. Listen to limits
  onSnapshot(collection(db, 'limits'), (snapshot) => {
    if (snapshot.empty) {
      DEFAULT_LIMITS.forEach(async (limit) => {
        await setDoc(doc(db, 'limits', limit.id), limit);
      });
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
      DEFAULT_DEADLINES.forEach(async (deadline) => {
        await setDoc(doc(db, 'deadlines', deadline.category), deadline);
      });
    } else {
      cachedDeadlines = snapshot.docs.map(doc => doc.data() as DrawDeadline);
      notifyListeners();
    }
  });

  // 6. Listen to settings/general
  onSnapshot(doc(db, 'settings', 'general'), async (snapshot) => {
    if (!snapshot.exists()) {
      await setDoc(doc(db, 'settings', 'general'), {
        adminEmail: 'mastermaindqureshi110@gmail.com',
        whatsappNumber: '923453090146'
      });
    } else {
      const data = snapshot.data();
      let adminEmail = data?.adminEmail || 'mastermaindqureshi110@gmail.com';
      if (adminEmail === 'mastermaind.qureshi110@gmail.com') {
        adminEmail = 'mastermaindqureshi110@gmail.com';
        // Auto-migrate in Firestore
        await setDoc(doc(db, 'settings', 'general'), { adminEmail }, { merge: true });
      }
      cachedAdminEmail = adminEmail;
      cachedSupportWhatsApp = data?.whatsappNumber || '923453090146';
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
  const email = localStorage.getItem(LOGGED_IN_EMAIL_KEY);
  if (!email) return null;
  const normalizedEmail = email.toLowerCase().trim();
  const user = cachedUsers.find((u) => u.email.toLowerCase() === normalizedEmail) || null;
  
  // If the user is an admin, do not auto-login from local storage unless verified via session!
  if (user && (user.isAdmin || user.role === 'admin' || normalizedEmail === 'mastermaindqureshi110@gmail.com' || normalizedEmail === 'mastermaind.qureshi110@gmail.com')) {
    if (sessionStorage.getItem('admin_verified') === 'true') {
      return {
        ...user,
        isAdmin: true,
        role: 'admin'
      };
    }
    return null;
  }
  return user;
}

export function setLoggedInUser(email: string) {
  localStorage.setItem(LOGGED_IN_EMAIL_KEY, email);
  localStorage.removeItem('mqe_user_logged_out_manually');
  
  const normalizedEmail = email.toLowerCase().trim();
  const user = cachedUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (user && (user.isAdmin || user.role === 'admin' || normalizedEmail === 'mastermaindqureshi110@gmail.com' || normalizedEmail === 'mastermaind.qureshi110@gmail.com')) {
    sessionStorage.setItem('admin_verified', 'true');
  }
  notifyListeners();
}

export function logout() {
  localStorage.removeItem(LOGGED_IN_EMAIL_KEY);
  localStorage.setItem('mqe_user_logged_out_manually', 'true');
  sessionStorage.removeItem('admin_verified');
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
    for (const em of emailsToUpdate) {
      await setDoc(doc(db, 'users', em), {
        password: passwordInput,
        role: 'admin',
        isAdmin: true
      }, { merge: true });
    }
    return true;
  } catch (e) {
    console.error("Error updating user password:", e);
    return false;
  }
}

// Business actions
export async function registerUser(name: string, phone: string, city: string, email: string, password: string): Promise<User | null> {
  const online = await checkInternetConnection();
  if (!online) {
    return null;
  }
  const normalizedEmail = email.toLowerCase();
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
    role: isAdmin ? 'admin' : 'customer',
    password
  };
  try {
    await setDoc(doc(db, 'users', normalizedEmail), newUser);
    return newUser;
  } catch (e) {
    console.error(e);
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
