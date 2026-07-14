import { User, Booking, NumberLimit, Demand, DrawDeadline } from '../types';
import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';

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
    isAdmin: true
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
      cachedUsers = snapshot.docs.map(doc => doc.data() as User);
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
  return cachedUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function setLoggedInUser(email: string) {
  localStorage.setItem(LOGGED_IN_EMAIL_KEY, email);
  localStorage.removeItem('mqe_user_logged_out_manually');
  notifyListeners();
}

export function logout() {
  localStorage.removeItem(LOGGED_IN_EMAIL_KEY);
  localStorage.setItem('mqe_user_logged_out_manually', 'true');
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
      isAdmin: true
    });
  } else {
    setDoc(doc(db, 'users', normalizedEmail), {
      email: normalizedEmail,
      name: 'ایڈمن قریشی صاحب',
      phone: '03453090146',
      city: 'لاہور',
      balance: 500000,
      isAdmin: true
    });
  }
}

// Business actions
export function registerUser(name: string, phone: string, city: string, email: string): User {
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
    isAdmin
  };
  setDoc(doc(db, 'users', normalizedEmail), newUser);
  return newUser;
}

export function rechargeWallet(email: string, amount: number): boolean {
  const normalizedEmail = email.toLowerCase();
  const user = cachedUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) return false;
  
  setDoc(doc(db, 'users', normalizedEmail), {
    ...user,
    balance: user.balance + amount
  });
  return true;
}

export function addBooking(
  email: string,
  category: 'pakistan_bond' | 'thailand_lottery',
  number: string,
  firstAmount: number,
  secondAmount: number
): { success: boolean; error?: string } {
  const normalizedEmail = email.toLowerCase();
  const user = cachedUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) return { success: false, error: 'کسٹمر ریکارڈ نہیں ملا' };

  const totalCost = firstAmount + secondAmount;
  if (user.balance < totalCost) {
    return { success: false, error: 'آپ کے والٹ میں کافی رقم موجود نہیں ہے' };
  }

  const limit = cachedLimits.find(l => l.category === category && l.number === number);
  if (limit) {
    if (firstAmount > limit.maxAmount) {
      return { 
        success: false, 
        error: `اس نمبر (${number}) کے لئے فرسٹ کی انفرادی حد Rs. ${limit.maxAmount} ہے` 
      };
    }
    if (secondAmount > limit.maxAmount) {
      return { 
        success: false, 
        error: `اس نمبر (${number}) کے لئے سیکنڈ کی انفرادی حد Rs. ${limit.maxAmount} ہے` 
      };
    }
  }

  // Deduct balance
  setDoc(doc(db, 'users', normalizedEmail), {
    ...user,
    balance: user.balance - totalCost
  });

  const bookingId = 'booking-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const newBooking: Booking = {
    id: bookingId,
    userEmail: normalizedEmail,
    category,
    number,
    firstAmount,
    secondAmount,
    timestamp: new Date().toISOString()
  };
  setDoc(doc(db, 'bookings', bookingId), newBooking);

  return { success: true };
}

export function cancelBooking(bookingId: string): { success: boolean; error?: string } {
  const booking = cachedBookings.find(b => b.id === bookingId);
  if (!booking) return { success: false, error: 'بکنگ کا ریکارڈ نہیں ملا' };

  const timeDiffMs = Date.now() - new Date(booking.timestamp).getTime();
  const limitMs = 2 * 60 * 1000;

  if (timeDiffMs > limitMs) {
    return { success: false, error: 'کینسل کرنے کا وقت (2 منٹ) ختم ہو چکا ہے' };
  }

  const user = cachedUsers.find(u => u.email.toLowerCase() === booking.userEmail.toLowerCase());
  if (user) {
    setDoc(doc(db, 'users', booking.userEmail.toLowerCase()), {
      ...user,
      balance: user.balance + (booking.firstAmount + booking.secondAmount)
    });
  }

  deleteDoc(doc(db, 'bookings', bookingId));

  return { success: true };
}

export function cancelBookingByAdmin(bookingId: string): { success: boolean; error?: string } {
  const booking = cachedBookings.find(b => b.id === bookingId);
  if (!booking) return { success: false, error: 'بکنگ کا ریکارڈ نہیں ملا' };

  const user = cachedUsers.find(u => u.email.toLowerCase() === booking.userEmail.toLowerCase());
  if (user) {
    setDoc(doc(db, 'users', booking.userEmail.toLowerCase()), {
      ...user,
      balance: user.balance + (booking.firstAmount + booking.secondAmount)
    });
  }

  deleteDoc(doc(db, 'bookings', bookingId));

  return { success: true };
}

export function setOrUpdateLimit(category: 'pakistan_bond' | 'thailand_lottery', number: string, maxAmount: number) {
  const existing = cachedLimits.find(l => l.category === category && l.number === number);
  const limitId = existing ? existing.id : 'limit-' + Date.now();
  
  const limit: NumberLimit = {
    id: limitId,
    category,
    number,
    maxAmount
  };
  setDoc(doc(db, 'limits', limitId), limit);
}

export function deleteLimit(id: string) {
  deleteDoc(doc(db, 'limits', id));
}

export function getDemands(): Demand[] {
  return cachedDemands;
}

export function saveDemands(demands: Demand[]) {
  demands.forEach(d => {
    setDoc(doc(db, 'demands', d.id), d);
  });
}

export function addDemand(
  email: string,
  category: 'pakistan_bond' | 'thailand_lottery',
  number: string,
  firstAmount: number,
  secondAmount: number
): { success: boolean; error?: string } {
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

  setDoc(doc(db, 'demands', demandId), newDemand);

  return { success: true };
}

export function approveDemand(demandId: string): { success: boolean; error?: string } {
  const demand = cachedDemands.find(d => d.id === demandId);
  if (!demand) return { success: false, error: 'ڈیمانڈ ریکارڈ نہیں ملا' };

  if (demand.status !== 'pending') {
    return { success: false, error: 'یہ ڈیمانڈ پہلے ہی عمل میں لائی جا چکی ہے' };
  }

  const user = cachedUsers.find(u => u.email.toLowerCase() === demand.userEmail.toLowerCase());
  if (!user) return { success: false, error: 'کسٹمر ریکارڈ نہیں ملا' };

  const totalCost = demand.firstAmount + demand.secondAmount;
  if (user.balance < totalCost) {
    return { success: false, error: 'کسٹمر کے والٹ میں کافی رقم موجود نہیں ہے' };
  }

  // Deduct balance
  setDoc(doc(db, 'users', demand.userEmail.toLowerCase()), {
    ...user,
    balance: user.balance - totalCost
  });

  const bookingId = 'booking-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const newBooking: Booking = {
    id: bookingId,
    userEmail: demand.userEmail,
    category: demand.category,
    number: demand.number,
    firstAmount: demand.firstAmount,
    secondAmount: demand.secondAmount,
    timestamp: new Date().toISOString()
  };
  setDoc(doc(db, 'bookings', bookingId), newBooking);

  setDoc(doc(db, 'demands', demandId), {
    ...demand,
    status: 'approved'
  });

  return { success: true };
}

export function rejectDemand(demandId: string): { success: boolean; error?: string } {
  const demand = cachedDemands.find(d => d.id === demandId);
  if (!demand) return { success: false, error: 'ڈیمانڈ ریکارڈ نہیں ملا' };

  if (demand.status !== 'pending') {
    return { success: false, error: 'یہ ڈیمانڈ پہلے ہی عمل میں لائی جا چکی ہے' };
  }

  setDoc(doc(db, 'demands', demandId), {
    ...demand,
    status: 'rejected'
  });

  return { success: true };
}

export function getDrawDeadlines(): DrawDeadline[] {
  return cachedDeadlines;
}

export function saveDrawDeadlines(deadlines: DrawDeadline[]) {
  deadlines.forEach(d => {
    setDoc(doc(db, 'deadlines', d.category), d);
  });
}

export function setDrawDeadline(
  category: 'pakistan_bond' | 'thailand_lottery',
  deadlineIso: string,
  titleUrdu: string,
  status: 'open' | 'closed'
) {
  const deadline: DrawDeadline = {
    category,
    deadlineIso,
    titleUrdu,
    status
  };
  setDoc(doc(db, 'deadlines', category), deadline);
}
