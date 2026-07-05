import { User, Booking, NumberLimit, Demand, DrawDeadline } from '../types';

// Standard storage keys
const USERS_KEY = 'mqe_users';
const BOOKINGS_KEY = 'mqe_bookings';
const LIMITS_KEY = 'mqe_limits';
const LOGGED_IN_EMAIL_KEY = 'mqe_logged_in_email';
const DEMANDS_KEY = 'mqe_demands';
const DEADLINES_KEY = 'mqe_deadlines';

const DEFAULT_DEADLINES: DrawDeadline[] = [
  {
    category: 'pakistan_bond',
    titleUrdu: 'بکنگ فائنل کھل گئی ہے',
    deadlineIso: '2026-06-30T18:00',
    status: 'open'
  },
  {
    category: 'thailand_lottery',
    titleUrdu: 'بکنگ فائنل کھل گئی ہے',
    deadlineIso: '2026-07-02T12:00',
    status: 'open'
  }
];

const DEFAULT_USERS: User[] = [
  {
    email: 'mastermaind.qureshi110@gmail.com',
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
    timestamp: new Date(Date.now() - 45000).toISOString() // 45 seconds ago, can still be cancelled
  },
  {
    id: 'booking-mock-2',
    userEmail: 'fareed.ghulam@gmail.com',
    category: 'thailand_lottery',
    number: '999',
    firstAmount: 300,
    secondAmount: 300,
    timestamp: new Date(Date.now() - 300000).toISOString() // 5 mins ago, cannot be cancelled
  }
];

export function initializeStore() {
  if (!localStorage.getItem('mqe_admin_configured_email') || localStorage.getItem('mqe_admin_configured_email') === 'admin@qureshi.com') {
    localStorage.setItem('mqe_admin_configured_email', 'mastermaind.qureshi110@gmail.com');
  }
  if (!localStorage.getItem('mqe_whatsapp_number') || localStorage.getItem('mqe_whatsapp_number') === '923001234567') {
    localStorage.setItem('mqe_whatsapp_number', '923453090146');
  }
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  } else {
    // Dynamic migration to ensure mastermaind.qureshi110@gmail.com is present in existing DB and set as Admin
    try {
      const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const adminEmail = localStorage.getItem('mqe_admin_configured_email') || 'mastermaind.qureshi110@gmail.com';
      const normalizedAdminEmail = adminEmail.trim().toLowerCase();
      
      let foundAdmin = false;
      const updatedUsers = users.map(u => {
        const isCurrentAdmin = u.email.toLowerCase() === normalizedAdminEmail;
        if (isCurrentAdmin) {
          foundAdmin = true;
          return { ...u, isAdmin: true };
        }
        // Demote old admin if needed, or keep them. Let's just make sure they are not standard admin unless configured
        if (u.email.toLowerCase() === 'admin@qureshi.com' && normalizedAdminEmail !== 'admin@qureshi.com') {
          return { ...u, isAdmin: false };
        }
        return u;
      });

      if (!foundAdmin) {
        updatedUsers.push({
          email: normalizedAdminEmail,
          name: 'ایڈمن قریشی صاحب',
          phone: '03453090146',
          city: 'لاہور',
          balance: 500000,
          isAdmin: true
        });
      }
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    } catch (e) {
      console.error(e);
    }
  }
  if (!localStorage.getItem(LIMITS_KEY)) {
    localStorage.setItem(LIMITS_KEY, JSON.stringify(DEFAULT_LIMITS));
  }
  if (!localStorage.getItem(BOOKINGS_KEY)) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(DEFAULT_BOOKINGS));
  }
  if (!localStorage.getItem(DEADLINES_KEY)) {
    localStorage.setItem(DEADLINES_KEY, JSON.stringify(DEFAULT_DEADLINES));
  }
  // Automatically log in the tester to save them steps, but allow switching users
  if (!localStorage.getItem(LOGGED_IN_EMAIL_KEY) && !localStorage.getItem('mqe_user_logged_out_manually')) {
    localStorage.setItem(LOGGED_IN_EMAIL_KEY, 'fareed.ghulam@gmail.com');
  }
}

export function getSupportWhatsAppNumber(): string {
  initializeStore();
  return localStorage.getItem('mqe_whatsapp_number') || '923453090146';
}

export function setSupportWhatsAppNumber(num: string) {
  let cleaned = num.replace(/[\s-+]/g, '');
  if (cleaned.startsWith('03')) {
    cleaned = '92' + cleaned.substring(1);
  }
  localStorage.setItem('mqe_whatsapp_number', cleaned);
}

export function getUsers(): User[] {
  initializeStore();
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getBookings(): Booking[] {
  initializeStore();
  return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
}

export function saveBookings(bookings: Booking[]) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function getNumberLimits(): NumberLimit[] {
  initializeStore();
  return JSON.parse(localStorage.getItem(LIMITS_KEY) || '[]');
}

export function saveNumberLimits(limits: NumberLimit[]) {
  localStorage.setItem(LIMITS_KEY, JSON.stringify(limits));
}

export function getLoggedInUser(): User | null {
  initializeStore();
  const email = localStorage.getItem(LOGGED_IN_EMAIL_KEY);
  if (!email) return null;
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function setLoggedInUser(email: string) {
  localStorage.setItem(LOGGED_IN_EMAIL_KEY, email);
  localStorage.removeItem('mqe_user_logged_out_manually');
}

export function logout() {
  localStorage.removeItem(LOGGED_IN_EMAIL_KEY);
  localStorage.setItem('mqe_user_logged_out_manually', 'true');
}

export function getAdminConfiguredEmail(): string {
  initializeStore();
  return localStorage.getItem('mqe_admin_configured_email') || 'mastermaind.qureshi110@gmail.com';
}

export function setAdminConfiguredEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  localStorage.setItem('mqe_admin_configured_email', normalizedEmail);
  
  const users = getUsers();
  let found = false;
  
  const updatedUsers = users.map(user => {
    const isThisAdmin = user.email.toLowerCase() === normalizedEmail;
    if (isThisAdmin) {
      found = true;
    }
    return {
      ...user,
      isAdmin: isThisAdmin
    };
  });
  
  if (!found) {
    updatedUsers.push({
      email: normalizedEmail,
      name: 'ایڈمن قریشی صاحب',
      phone: '03453090146',
      city: 'لاہور',
      balance: 500000,
      isAdmin: true
    });
  }
  
  saveUsers(updatedUsers);
}

// Business actions
export function registerUser(name: string, phone: string, city: string, email: string): User {
  const users = getUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return existing;
  }
  const adminEmail = getAdminConfiguredEmail();
  const newUser: User = {
    email,
    name,
    phone,
    city,
    balance: 500, // Good warm welcome bonus starting balance!
    isAdmin: email.toLowerCase() === adminEmail.toLowerCase()
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function rechargeWallet(email: string, amount: number): boolean {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (userIndex === -1) return false;
  users[userIndex].balance += amount;
  saveUsers(users);
  return true;
}

export function addBooking(
  email: string,
  category: 'pakistan_bond' | 'thailand_lottery',
  number: string,
  firstAmount: number,
  secondAmount: number
): { success: boolean; error?: string } {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (userIndex === -1) return { success: false, error: 'کسٹمر ریکارڈ نہیں ملا' };

  const totalCost = firstAmount + secondAmount;
  if (users[userIndex].balance < totalCost) {
    return { success: false, error: 'آپ کے والٹ میں کافی رقم موجود نہیں ہے' };
  }

  // Check limits
  const limits = getNumberLimits();
  const limit = limits.find(l => l.category === category && l.number === number);
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
  users[userIndex].balance -= totalCost;
  saveUsers(users);

  // Add booking
  const bookings = getBookings();
  const newBooking: Booking = {
    id: 'booking-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    userEmail: email,
    category,
    number,
    firstAmount,
    secondAmount,
    timestamp: new Date().toISOString()
  };
  bookings.unshift(newBooking);
  saveBookings(bookings);

  return { success: true };
}

export function cancelBooking(bookingId: string): { success: boolean; error?: string } {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === bookingId);
  if (index === -1) return { success: false, error: 'بکنگ کا ریکارڈ نہیں ملا' };

  const booking = bookings[index];
  const timeDiffMs = Date.now() - new Date(booking.timestamp).getTime();
  const limitMs = 2 * 60 * 1000; // 2 minutes in milliseconds

  if (timeDiffMs > limitMs) {
    return { success: false, error: 'کینسل کرنے کا وقت (2 منٹ) ختم ہو چکا ہے' };
  }

  // Refund wallet
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === booking.userEmail.toLowerCase());
  if (userIndex !== -1) {
    users[userIndex].balance += (booking.firstAmount + booking.secondAmount);
    saveUsers(users);
  }

  // Remove booking
  bookings.splice(index, 1);
  saveBookings(bookings);

  return { success: true };
}

export function setOrUpdateLimit(category: 'pakistan_bond' | 'thailand_lottery', number: string, maxAmount: number) {
  const limits = getNumberLimits();
  const existingIndex = limits.findIndex(l => l.category === category && l.number === number);
  if (existingIndex !== -1) {
    limits[existingIndex].maxAmount = maxAmount;
  } else {
    limits.push({
      id: 'limit-' + Date.now(),
      category,
      number,
      maxAmount
    });
  }
  saveNumberLimits(limits);
}

export function deleteLimit(id: string) {
  const limits = getNumberLimits();
  const filtered = limits.filter(l => l.id !== id);
  saveNumberLimits(filtered);
}

// Demand functions
export function getDemands(): Demand[] {
  initializeStore();
  return JSON.parse(localStorage.getItem(DEMANDS_KEY) || '[]');
}

export function saveDemands(demands: Demand[]) {
  localStorage.setItem(DEMANDS_KEY, JSON.stringify(demands));
}

export function addDemand(
  email: string,
  category: 'pakistan_bond' | 'thailand_lottery',
  number: string,
  firstAmount: number,
  secondAmount: number
): { success: boolean; error?: string } {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { success: false, error: 'کسٹمر ریکارڈ نہیں ملا' };

  const totalCost = firstAmount + secondAmount;
  if (user.balance < totalCost) {
    return { success: false, error: 'آپ کے والٹ میں کافی رقم موجود نہیں ہے' };
  }

  const demands = getDemands();
  const newDemand: Demand = {
    id: 'demand-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    userEmail: email,
    category,
    number,
    firstAmount,
    secondAmount,
    timestamp: new Date().toISOString(),
    status: 'pending'
  };

  demands.unshift(newDemand);
  saveDemands(demands);

  return { success: true };
}

export function approveDemand(demandId: string): { success: boolean; error?: string } {
  const demands = getDemands();
  const demandIndex = demands.findIndex(d => d.id === demandId);
  if (demandIndex === -1) return { success: false, error: 'ڈیمانڈ ریکارڈ نہیں ملا' };

  const demand = demands[demandIndex];
  if (demand.status !== 'pending') {
    return { success: false, error: 'یہ ڈیمانڈ پہلے ہی عمل میں لائی جا چکی ہے' };
  }

  const users = getUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === demand.userEmail.toLowerCase());
  if (userIndex === -1) return { success: false, error: 'کسٹمر ریکارڈ نہیں ملا' };

  const totalCost = demand.firstAmount + demand.secondAmount;
  if (users[userIndex].balance < totalCost) {
    return { success: false, error: 'کسٹمر کے والٹ میں کافی رقم موجود نہیں ہے' };
  }

  // Deduct balance
  users[userIndex].balance -= totalCost;
  saveUsers(users);

  // Convert to Booking
  const bookings = getBookings();
  const newBooking: Booking = {
    id: 'booking-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    userEmail: demand.userEmail,
    category: demand.category,
    number: demand.number,
    firstAmount: demand.firstAmount,
    secondAmount: demand.secondAmount,
    timestamp: new Date().toISOString()
  };
  bookings.unshift(newBooking);
  saveBookings(bookings);

  // Update status
  demands[demandIndex].status = 'approved';
  saveDemands(demands);

  return { success: true };
}

export function rejectDemand(demandId: string): { success: boolean; error?: string } {
  const demands = getDemands();
  const demandIndex = demands.findIndex(d => d.id === demandId);
  if (demandIndex === -1) return { success: false, error: 'ڈیمانڈ ریکارڈ نہیں ملا' };

  const demand = demands[demandIndex];
  if (demand.status !== 'pending') {
    return { success: false, error: 'یہ ڈیمانڈ پہلے ہی عمل میں لائی جا چکی ہے' };
  }

  demands[demandIndex].status = 'rejected';
  saveDemands(demands);

  return { success: true };
}

// Deadline configurations
export function getDrawDeadlines(): DrawDeadline[] {
  initializeStore();
  const list = JSON.parse(localStorage.getItem(DEADLINES_KEY) || '[]');
  return list.map((d: any) => ({
    ...d,
    status: d.status || 'open'
  }));
}

export function saveDrawDeadlines(deadlines: DrawDeadline[]) {
  localStorage.setItem(DEADLINES_KEY, JSON.stringify(deadlines));
}

export function setDrawDeadline(
  category: 'pakistan_bond' | 'thailand_lottery',
  deadlineIso: string,
  titleUrdu: string,
  status: 'open' | 'closed'
) {
  const deadlines = getDrawDeadlines();
  const index = deadlines.findIndex(d => d.category === category);
  if (index !== -1) {
    deadlines[index].deadlineIso = deadlineIso;
    deadlines[index].titleUrdu = titleUrdu;
    deadlines[index].status = status;
  } else {
    deadlines.push({
      category,
      deadlineIso,
      titleUrdu,
      status
    });
  }
  saveDrawDeadlines(deadlines);
}


