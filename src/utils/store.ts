import { User, Booking, DealerBooking, NumberLimit, HardFavoriteNumber, Demand, DrawDeadline, PakistanBondResult, ThaiLotteryResult, AllResultType, DrawCategory, Transaction } from '../types';
import { db, auth, firebaseConfig } from '../lib/firebase';
import { 
  ref,
  set,
  update,
  remove,
  onValue,
  get
} from 'firebase/database';
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
import { thailandLotteryDraws } from './thailandLotteryData';

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

// Memory caches
let cachedUsers: User[] = [];
let cachedBookings: Booking[] = [];
let cachedDealerBookings: DealerBooking[] = [];
let cachedLimits: NumberLimit[] = [];
let cachedHardFavoriteNumbers: HardFavoriteNumber[] = [];
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

export function sortResultsChronological<T extends { date?: string; drawNo?: string; id?: string }>(list: T[]): T[] {
  return [...list].sort((a, b) => {
    const timeA = a.date ? new Date(a.date).getTime() : 0;
    const timeB = b.date ? new Date(b.date).getTime() : 0;
    if (timeB !== timeA) {
      return timeB - timeA; // Consistent newest -> oldest chronological order
    }
    return (b.drawNo || b.id || '').localeCompare(a.drawNo || a.id || '');
  });
}

/**
 * Normalizes a booking number:
 * - Trims outer whitespace
 * - Converts Eastern Arabic and Urdu numerals (۰-۹) to standard digits (0-9)
 * - Strips any spaces, hyphens, and hashes to prevent formatting bypasses
 * - CRITICAL: Preserves leading zeros and exact character length (e.g. "05" remains "05", distinct from "5")
 */
export function normalizeBookingNumber(raw: string | number | undefined | null): string {
  if (raw === undefined || raw === null) return '';
  const str = String(raw).trim();
  if (!str) return '';
  const arabicUrduMap: Record<string, string> = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
  };
  let cleaned = str.replace(/[۰-۹٠-٩]/g, (ch) => arabicUrduMap[ch] || ch);
  cleaned = cleaned.replace(/[\s\-_#]/g, '');
  return cleaned;
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
    if (email === 'mastermaind.qureshi110@gmail.com') {
      return true;
    }
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
    if (email === 'fareed.ghulam@gmail.com') {
      return true;
    }
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
        // Look up user role dynamically
        let userProfile = cachedUsers.find(u => u.uid === uid);
        if (!userProfile) {
          try {
            const userSnap = await get(ref(db, `users/${uid}`));
            if (userSnap.exists()) {
              userProfile = userSnap.val() as User;
              const idx = cachedUsers.findIndex(u => u.uid === uid);
              if (idx !== -1) {
                cachedUsers[idx] = userProfile;
              } else {
                cachedUsers.push(userProfile);
              }
            }
          } catch (e) {
            console.error("Failed to fetch user role on auth state change:", e);
          }
        }

        if (userProfile) {
          try {
            localStorage.setItem('mqe_cached_user_profile', JSON.stringify(userProfile));
          } catch (e) {
            // Ignore localStorage errors
          }
        }
      }
    } else {
      sessionStorage.removeItem('admin_verified');
      try {
        localStorage.removeItem('mqe_cached_user_profile');
      } catch (e) {
        // Ignore localStorage errors
      }
    }
    notifyListeners();
  });

  // 1. Listen to users
  onValue(ref(db, 'users'), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      cachedUsers = [];
      notifyListeners();
    } else {
      const tempUsers = Object.keys(val).map(uid => {
        const data = val[uid] as User;
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

        const emailLower = (mappedUser.email || data.email || '').toLowerCase().trim();
        const isSuperAdminEmail = emailLower === 'mastermaind.qureshi110@gmail.com';
        const isDataEntryEmail = emailLower === 'fareed.ghulam@gmail.com';

        const isSuper = isSuperAdminEmail || data.role === 'superAdmin' || data.role === 'admin';
        const isDataEntry = isDataEntryEmail || data.role === 'dataEntryAdmin';

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
    console.log("[UsersCollection] RTDB users listener restricted for non-admin user (using document listener):", error.message);
  });

  // Active single-user document listener for real-time customer profile & balance sync
  let activeUserUnsub: (() => void) | null = null;
  let activeDealerBookingsUnsub: (() => void) | null = null;
  let activeHardFavoriteUnsub: (() => void) | null = null;
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (activeUserUnsub) {
      activeUserUnsub();
      activeUserUnsub = null;
    }

    if (activeDealerBookingsUnsub) {
      activeDealerBookingsUnsub();
      activeDealerBookingsUnsub = null;
    }

    if (activeHardFavoriteUnsub) {
      activeHardFavoriteUnsub();
      activeHardFavoriteUnsub = null;
    }

    cachedDealerBookings = [];
    cachedHardFavoriteNumbers = [];

    if (firebaseUser) {
      const uid = firebaseUser.uid;
      const email = firebaseUser.email || '';
      const emailLower = email.toLowerCase().trim();
      const isSuperAdminEmail = emailLower === 'mastermaind.qureshi110@gmail.com';
      const isDataEntryEmail = emailLower === 'fareed.ghulam@gmail.com';

      // SECURITY: dealerBookings are never globally subscribed for non-admins.
      // Dealer -> only own bookings.
      // Admin/Data Entry -> all dealer bookings.
      const syncDealerBookingsListener = (roleData: User) => {
        if (activeDealerBookingsUnsub) {
          activeDealerBookingsUnsub();
          activeDealerBookingsUnsub = null;
        }

        cachedDealerBookings = [];

        const role = roleData.role;
        const isDealer = role === 'dealer';
        const isDealerAdmin =
          role === 'superAdmin' ||
          role === 'admin' ||
          role === 'dataEntryAdmin' ||
          isSuperAdminEmail ||
          isDataEntryEmail ||
          roleData.isAdmin === true;

        if (!isDealer && !isDealerAdmin) {
          notifyListeners();
          return;
        }

        activeDealerBookingsUnsub = onValue(
          ref(db, 'dealerBookings'),
          (snapshot) => {
            const val = snapshot.val();
            const list: DealerBooking[] = val
              ? Object.keys(val).map(k => ({ ...val[k], id: val[k].id || k }))
              : [];

            const filtered = isDealer
              ? list.filter(b => b.dealerId === uid)
              : list;

            cachedDealerBookings = filtered.sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            );

            notifyListeners();
          },
          (err) => {
            console.error(
              `[DealerBookings] Listener failed for ${uid}:`,
              err
            );
            cachedDealerBookings = [];
            notifyListeners();
          }
        );
      };

      // SECURITY: Hard Favorite Numbers are strictly Admin-only.
      // Non-admins, dealers, and public never receive the real-time list.
      const syncHardFavoriteListener = (roleData: User) => {
        if (activeHardFavoriteUnsub) {
          activeHardFavoriteUnsub();
          activeHardFavoriteUnsub = null;
        }

        cachedHardFavoriteNumbers = [];

        const role = roleData.role;
        const isAdminUser =
          role === 'superAdmin' ||
          role === 'admin' ||
          role === 'dataEntryAdmin' ||
          isSuperAdminEmail ||
          isDataEntryEmail ||
          roleData.isAdmin === true;

        if (!isAdminUser) {
          notifyListeners();
          return;
        }

        activeHardFavoriteUnsub = onValue(
          ref(db, 'hardFavoriteNumbers'),
          (snapshot) => {
            const val = snapshot.val();
            const list: HardFavoriteNumber[] = val
              ? Object.keys(val).map(k => ({ ...val[k], id: val[k].id || k }))
              : [];

            cachedHardFavoriteNumbers = list
              .filter(hf => !hf.isArchived)
              .sort(
                (a, b) =>
                  new Date(b.createdAt || 0).getTime() -
                  new Date(a.createdAt || 0).getTime()
              );

            notifyListeners();
          },
          (err) => {
            console.error(
              `[HardFavoriteNumbers] Listener failed for ${uid}:`,
              err
            );
            cachedHardFavoriteNumbers = [];
            notifyListeners();
          }
        );
      };

      activeUserUnsub = onValue(ref(db, `users/${uid}`), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.val() as User;
          const userObj: User = {
            ...data,
            uid: data.uid || uid,
            email: data.email || firebaseUser.email || ''
          };
          const emailLower = (userObj.email || data.email || '').toLowerCase().trim();
          const isSuperAdminEmail = emailLower === 'mastermaind.qureshi110@gmail.com';
          const isDataEntryEmail = emailLower === 'fareed.ghulam@gmail.com';

          const isSuper = isSuperAdminEmail || data.role === 'superAdmin' || data.role === 'admin';
          const isDataEntry = isDataEntryEmail || data.role === 'dataEntryAdmin';
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

            // SECURITY: Start the dealerBookings listener only after
            // the user's complete role/admin status has been resolved.
            syncDealerBookingsListener(userObj);
            syncHardFavoriteListener(userObj);

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
  onValue(ref(db, 'bookings'), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      cachedBookings = [];
    } else {
      const list: Booking[] = Object.keys(val).map(k => ({ ...val[k], id: val[k].id || k }));
      cachedBookings = list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    notifyListeners();
  });

  // 3. Listen to limits
  onValue(ref(db, 'limits'), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      cachedLimits = [];
    } else {
      cachedLimits = Object.keys(val).map(k => ({ ...val[k], id: val[k].id || k }));
    }
    notifyListeners();
  });

  // 4. Listen to demands
  onValue(ref(db, 'demands'), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      cachedDemands = [];
    } else {
      const list: Demand[] = Object.keys(val).map(k => ({ ...val[k], id: val[k].id || k }));
      cachedDemands = list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    notifyListeners();
  });

  // 5. Listen to deadlines
  onValue(ref(db, 'deadlines'), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      cachedDeadlines = [];
    } else {
      cachedDeadlines = Object.keys(val).map(k => ({ id: k, ...val[k] }));
    }
    notifyListeners();
  });

  // 5.5. Listen to transactions
  onValue(ref(db, 'transactions'), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      cachedTransactions = [];
    } else {
      const list: Transaction[] = Object.keys(val).map(k => ({ ...val[k], id: val[k].id || k }));
      cachedTransactions = list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    notifyListeners();
  });

  // 6. Listen to settings/general
  onValue(ref(db, 'settings/general'), async (snapshot) => {
    if (!snapshot.exists()) {
      if (isLoggedUserAdminOrSuper()) {
        try {
          await set(ref(db, 'settings/general'), {
            adminEmail: 'mastermaind.qureshi110@gmail.com',
            whatsappNumber: '923453090146'
          });
        } catch (e) {
          console.error("Failed to initialize default settings:", e);
        }
      }
    } else {
      const data = snapshot.val();
      const adminEmail = data?.adminEmail || 'mastermaind.qureshi110@gmail.com';
      cachedAdminEmail = adminEmail;
      cachedSupportWhatsApp = data?.whatsappNumber || '923453090146';
      notifyListeners();
    }
  });

  // 7. Listen to pakistanBondResults (with auto-migration)
  onValue(ref(db, 'pakistanBondResults'), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      if (isLoggedUserAdminOrSuper() || isLoggedUserDataEntry()) {
        console.log("Migrating Pakistan Bond results to RTDB...");
        // Ensure historical data is available
        if (pakistanBondDraws && pakistanBondDraws.length > 0) {
          const updates: Record<string, any> = {};
          pakistanBondDraws.forEach((draw) => {
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
            updates[`pakistanBondResults/${draw.id}`] = resultDoc;
          });
          update(ref(db), updates).catch(e => console.error("Failed to migrate pakistanBondResult docs:", e));
        }
      }
    } else {
      const parsedList = Object.keys(val).map(k => ({ ...val[k], id: val[k].id || k })) as PakistanBondResult[];
      cachedPakistanBondResults = sortResultsChronological(parsedList);
      notifyListeners();
    }
  });

  // 8. Listen to thaiLotteryResults
  onValue(ref(db, 'thaiLotteryResults'), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      if (isLoggedUserAdminOrSuper() || isLoggedUserDataEntry()) {
        console.log("Migrating Thailand Lottery results to RTDB...");
        if (thailandLotteryDraws && thailandLotteryDraws.length > 0) {
          const updates: Record<string, any> = {};
          thailandLotteryDraws.forEach((draw) => {
            updates[`thaiLotteryResults/${draw.id}`] = draw;
          });
          update(ref(db), updates).catch(e => console.error("Failed to migrate thaiLotteryResult docs:", e));
        }
      }
      cachedThaiLotteryResults = sortResultsChronological([...thailandLotteryDraws]);
    } else {
      const parsedList = Object.keys(val).map(
        k => ({ ...val[k], id: val[k].id || k }) as ThaiLotteryResult
      );
      // If RTDB currently has fewer records than default draws, merge to ensure complete historical archive
      const existingIds = new Set(parsedList.map(p => p.id));
      const combined = [...parsedList];
      thailandLotteryDraws.forEach(d => {
        if (!existingIds.has(d.id)) {
          combined.push(d);
        }
      });
      cachedThaiLotteryResults = sortResultsChronological(combined);
    }
    notifyListeners();
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
  update(ref(db, 'settings/general'), {
    adminEmail: cachedAdminEmail,
    whatsappNumber: cleaned
  });
}

export function getUsers(): User[] {
  return cachedUsers;
}

export function saveUsers(users: User[]) {
  const updates: Record<string, any> = {};
  users.forEach(u => {
    let targetUid = u.uid;
    if (!targetUid) {
      const cached = cachedUsers.find(x => x.email.toLowerCase() === u.email.toLowerCase());
      targetUid = cached?.uid;
    }
    if (targetUid) {
      updates[`users/${targetUid}`] = { ...u, uid: targetUid };
    } else {
      console.warn("Skipping save for user without UID:", u.email);
    }
  });
  if (Object.keys(updates).length > 0) {
    update(ref(db), updates);
  }
}

export function getBookings(): Booking[] {
  return cachedBookings;
}

export function saveBookings(bookings: Booking[]) {
  const updates: Record<string, any> = {};
  bookings.forEach(b => {
    updates[`bookings/${b.id}`] = b;
  });
  if (Object.keys(updates).length > 0) {
    update(ref(db), updates);
  }
}

export function getDealerBookings(): DealerBooking[] {
  return cachedDealerBookings;
}

export function saveDealerBookings(bookings: DealerBooking[]) {
  const updates: Record<string, any> = {};
  bookings.forEach(b => {
    updates[`dealerBookings/${b.id}`] = b;
  });
  if (Object.keys(updates).length > 0) {
    update(ref(db), updates);
  }
}

export function getNumberLimits(): NumberLimit[] {
  return cachedLimits;
}

export function saveNumberLimits(limits: NumberLimit[]) {
  const updates: Record<string, any> = {};
  limits.forEach(l => {
    updates[`limits/${l.id}`] = l;
  });
  if (Object.keys(updates).length > 0) {
    update(ref(db), updates);
  }
}

/**
 * Retrieves the Hard Favorite Numbers list.
 * STRICT SECURITY: Never returns data to non-admin accounts.
 */
export function getHardFavoriteNumbers(): HardFavoriteNumber[] {
  if (!isLoggedUserAdminOrSuper() && !isLoggedUserDataEntry()) {
    return [];
  }
  return cachedHardFavoriteNumbers;
}

export function getLoggedInUser(): User | null {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;
  const emailLower = firebaseUser.email?.toLowerCase().trim() || '';
  let user = cachedUsers.find((u) => u.uid === firebaseUser.uid || (emailLower && u.email && u.email.toLowerCase().trim() === emailLower)) || null;

  if (!user) {
    try {
      const localCached = localStorage.getItem('mqe_cached_user_profile');
      if (localCached) {
        const parsed = JSON.parse(localCached) as User;
        if (parsed && (parsed.uid === firebaseUser.uid || (emailLower && parsed.email?.toLowerCase().trim() === emailLower))) {
          user = parsed;
        }
      }
    } catch (e) {
      // Ignore JSON parse errors
    }
  }

  if (user) {
    const userEmail = (user.email || '').toLowerCase().trim();
    const isUserSuperEmail = userEmail === 'mastermaind.qureshi110@gmail.com';
    const isUserDataEntryEmail = userEmail === 'fareed.ghulam@gmail.com';

    const isSuper = isUserSuperEmail || user.role === 'superAdmin' || user.role === 'admin' || user.isAdmin === true;
    const isDataEntry = isUserDataEntryEmail || user.role === 'dataEntryAdmin';

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
    // Admin authentication is handled by Firebase Auth.
    // Legacy admin session flags are no longer used as authentication.
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
  
  update(ref(db, 'settings/general'), {
    adminEmail: normalizedEmail,
    whatsappNumber: cachedSupportWhatsApp
  });
  
  const user = cachedUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (user && user.uid) {
    update(ref(db, `users/${user.uid}`), {
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
        await update(ref(db, `users/${cached.uid}`), {
          isAdmin: true
        });
      } else {
        console.warn(`Could not update admin role in RTDB for ${em} because no UID was found.`);
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
      await update(ref(db, `users/${cached.uid}`), {
        email: normalizedEmail
      });
    } else {
      console.warn(`Could not update customer metadata in RTDB for ${normalizedEmail} because no UID was found.`);
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
  const isAdmin = normalizedEmail === cachedAdminEmail.toLowerCase() || normalizedEmail === 'mastermaind.qureshi110@gmail.com';
  
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

    // Write profile information to RTDB with UID key
    await set(ref(db, `users/${uid}`), newUser);

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

    const userRef = ref(db, `users/${uid}`);
    const userSnap = await get(userRef);

    let userProfile: User;
    let isNewOrIncomplete = false;

    if (userSnap.exists()) {
      const data = userSnap.val() as User;
      const isComplete = data.profileCompleted === true || (Boolean(data.phone?.trim()) && Boolean(data.city?.trim()));
      userProfile = {
        ...data,
        uid,
        email,
        photoURL: photoURL || data.photoURL || '',
        profileCompleted: isComplete
      };
      if (photoURL && data.photoURL !== photoURL) {
        await update(userRef, { photoURL });
      }
      if (!isComplete) {
        isNewOrIncomplete = true;
      }
    } else {
      const isAdmin = email === cachedAdminEmail.toLowerCase() || email === 'mastermaind.qureshi110@gmail.com';
      userProfile = {
        uid,
        email,
        name: firebaseUser.displayName || 'گوگل صارف',
        phone: '',
        city: '',
        photoURL,
        balance: 0,
        isAdmin,
        role: isAdmin ? 'admin' : 'customer',
        profileCompleted: false
      };
      await set(userRef, userProfile);
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
    await set(ref(db, `transactions/${txId}`), tx);
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
    await set(ref(db, `transactions/${txId}`), tx);
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

  try {
    const userSnap = await get(ref(db, `users/${cachedUser.uid}`));
    if (!userSnap.exists()) throw new Error('صارف ریکارڈ موجود نہیں ہے');

    const userData = userSnap.val() as User;
    let newBalance = userData.balance || 0;

    if (tx.type === 'recharge') {
      newBalance = (userData.balance || 0) + tx.amount;
    } else if (tx.type === 'withdrawal') {
      if ((userData.balance || 0) < tx.amount) {
        throw new Error('صارف کے پاس کافی بیلنس نہیں ہے');
      }
      newBalance = (userData.balance || 0) - tx.amount;
    }

    const updates: Record<string, any> = {};
    updates[`users/${cachedUser.uid}/balance`] = newBalance;
    updates[`transactions/${transactionId}/status`] = 'approved';

    await update(ref(db), updates);

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
    await update(ref(db, `transactions/${transactionId}`), {
      status: 'rejected'
    });
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

    await update(ref(db, `users/${uid}`), updatePayload);

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
    console.error('Error updating user profile in RTDB:', error);
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

  // 2. Fallback: Query RTDB directly for users if not found in memory
  if (!targetUid) {
    try {
      const usersSnap = await get(ref(db, 'users'));
      if (usersSnap.exists()) {
        const usersVal = usersSnap.val();
        for (const k of Object.keys(usersVal)) {
          const u = usersVal[k] as User;
          if ((u.email || '').toLowerCase().trim() === normalizedEmail) {
            targetUid = u.uid || k;
            targetName = u.name || 'صارف';
            targetBalance = u.balance || 0;
            break;
          }
        }
      }
    } catch (err) {
      console.error("[rechargeWallet] RTDB user query failed:", err);
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
  
  const txId = 'tx-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

  try {
    const userSnap = await get(ref(db, `users/${targetUid}`));
    if (!userSnap.exists()) {
      throw new Error('کسٹمر کا اکاؤنٹ نہیں ملا۔');
    }
    const user = userSnap.val() as User;
    const currentBal = user.balance ?? 0;

    if (amount < 0 && (currentBal + amount < 0)) {
      throw new Error(`کسٹمر کا بیلنس منفی نہیں ہو سکتا۔ موجودہ بیلنس: Rs. ${currentBal.toLocaleString()}`);
    }

    const newBal = currentBal + amount;
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

    const updates: Record<string, any> = {};
    updates[`users/${targetUid}/balance`] = newBal;
    updates[`transactions/${txId}`] = tx;

    await update(ref(db), updates);

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
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'NO_INTERNET' };
  }

  const normalizedEmail = email.toLowerCase().trim();
  const currentAuthUid = auth.currentUser?.uid;
  const cached = cachedUsers.find(u => (u.email && u.email.toLowerCase().trim() === normalizedEmail) || (currentAuthUid && u.uid === currentAuthUid));
  const uid = currentAuthUid || cached?.uid;
  if (!uid) {
    return { success: false, error: 'صارف کا ریکارڈ نہیں ملا' };
  }

  const isDealer = cached?.role === 'dealer';
  const collectionPath = isDealer ? 'dealerBookings' : 'bookings';
  const bookingId = (isDealer ? 'dlr-booking-' : 'booking-') + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const txId = 'tx-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const totalCost = firstAmount + secondAmount;

  try {
    const userSnap = await get(ref(db, `users/${uid}`));
    if (!userSnap.exists()) {
      throw new Error('صارف کا ریکارڈ نہیں ملا');
    }
    const userData = userSnap.val() as User;
    const currentBal = userData.balance ?? 0;

    if (currentBal < totalCost) {
      throw new Error('آپ کے والٹ میں کافی رقم موجود نہیں ہے');
    }

    const limit = cachedLimits.find(l => (drawId ? l.drawId === drawId : l.category === category) && normalizeBookingNumber(l.number) === normalizeBookingNumber(number));
    if (limit) {
      const firstLimit = typeof limit.firstPrizeAmountLimit === 'number' ? limit.firstPrizeAmountLimit : limit.maxAmount;
      const secondLimit = typeof limit.secondPrizeAmountLimit === 'number' ? limit.secondPrizeAmountLimit : limit.maxAmount;

      if (firstLimit > 0 && firstAmount > firstLimit) {
        throw new Error('یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔');
      }
      if (secondLimit > 0 && secondAmount > secondLimit) {
        throw new Error('یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔');
      }
    }

    // HARD FAVORITE / BLOCKED CHECK: Rejects prohibited numbers authoritatively
    const isHardFavBlocked = await checkIsNumberHardFavorite(category, number, drawId);
    if (isHardFavBlocked) {
      throw new Error('یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔');
    }

    const categoryLabelMap: Record<DrawCategory, string> = {
      pakistan_bond: 'پاکستان پرائز بانڈ',
      thailand_lottery: 'تھائی لینڈ لاٹری'
    };

    let newBookingObj: Booking | DealerBooking;
    if (isDealer) {
      newBookingObj = {
        id: bookingId,
        dealerId: uid,
        dealerEmail: normalizedEmail,
        dealerName: userData.name || cached?.name || 'ڈیلر',
        category,
        number,
        firstAmount,
        secondAmount,
        timestamp: new Date().toISOString(),
        ...(drawId && { drawId }),
        ...(bondValue && { bondValue }),
        ...(drawNumber && { drawNumber }),
        ...(drawCity && { drawCity }),
        ...(drawDate && { drawDate })
      } as DealerBooking;
    } else {
      newBookingObj = {
        id: bookingId,
        userEmail: normalizedEmail,
        category,
        number,
        firstAmount,
        secondAmount,
        timestamp: new Date().toISOString(),
        ...(drawId && { drawId }),
        ...(bondValue && { bondValue }),
        ...(drawNumber && { drawNumber }),
        ...(drawCity && { drawCity }),
        ...(drawDate && { drawDate })
      } as Booking;
    }

    const tx: Transaction = {
      id: txId,
      userId: uid,
      userEmail: normalizedEmail,
      userName: userData.name || cached?.name || (isDealer ? 'ڈیلر' : 'صارف'),
      type: 'booking_deduction',
      amount: totalCost,
      date: new Date().toISOString(),
      status: 'approved',
      note: `${categoryLabelMap[category] || category} نمبر #${number} ${isDealer ? 'ڈیلر ' : ''}بکنگ کٹوتی`
    };

    const updates: Record<string, any> = {};
    updates[`${collectionPath}/${bookingId}`] = newBookingObj;
    updates[`transactions/${txId}`] = tx;
    updates[`users/${uid}/balance`] = currentBal - totalCost;

    await update(ref(db), updates);

    if (cached) {
      cached.balance = (cached.balance || 0) - totalCost;
    }
    notifyListeners();
    return { success: true };
  } catch (err: any) {
    console.error("Booking transaction failed:", err);
    return { success: false, error: err.message || 'بکنگ کے دوران غلطی پیش آئی۔' };
  }
}

export async function cancelDealerBooking(bookingId: string): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'NO_INTERNET' };
  }

  const booking = cachedDealerBookings.find(b => b.id === bookingId);
  if (!booking) return { success: false, error: 'ڈیلر بکنگ کا ریکارڈ نہیں ملا' };

  const timeDiffMs = Date.now() - new Date(booking.timestamp).getTime();
  const limitMs = 2 * 60 * 1000;

  if (timeDiffMs > limitMs) {
    return { success: false, error: 'کینسل کرنے کا وقت (2 منٹ) ختم ہو چکا ہے' };
  }

  const dealerId = booking.dealerId;
  const refundAmount = booking.firstAmount + booking.secondAmount;

  try {
    const userSnap = await get(ref(db, `users/${dealerId}`));
    const userData = userSnap.exists() ? (userSnap.val() as User) : null;
    const currentBalance = userData?.balance || 0;

    const updates: Record<string, any> = {};
    updates[`dealerBookings/${bookingId}`] = null;
    if (userData) {
      updates[`users/${dealerId}/balance`] = currentBalance + refundAmount;
    }

    await update(ref(db), updates);
    return { success: true };
  } catch (err: any) {
    console.error("Cancel dealer booking failed:", err);
    return { success: false, error: err.message || 'منسوخی کے دوران غلطی پیش آئی۔' };
  }
}

export async function cancelDealerBookingByAdmin(bookingId: string): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'NO_INTERNET' };
  }

  const booking = cachedDealerBookings.find(b => b.id === bookingId);
  if (!booking) return { success: false, error: 'ڈیلر بکنگ کا ریکارڈ نہیں ملا' };

  const dealerId = booking.dealerId;
  const refundAmount = booking.firstAmount + booking.secondAmount;

  try {
    const userSnap = await get(ref(db, `users/${dealerId}`));
    const userData = userSnap.exists() ? (userSnap.val() as User) : null;
    const currentBalance = userData?.balance || 0;

    const updates: Record<string, any> = {};
    updates[`dealerBookings/${bookingId}`] = null;
    if (userData) {
      updates[`users/${dealerId}/balance`] = currentBalance + refundAmount;
    }

    await update(ref(db), updates);
    return { success: true };
  } catch (err: any) {
    console.error("Admin cancel dealer booking failed:", err);
    return { success: false, error: err.message || 'منسوخی کے دوران غلطی پیش آئی۔' };
  }
}

export async function assignDealerRole(uid: string, enableDealer: boolean): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'NO_INTERNET' };

  if (!isLoggedUserAdminOrSuper()) {
    return { success: false, error: 'صرف ایڈمن کو ڈیلر رول تبدیل کرنے کا اختیار ہے۔' };
  }

  try {
    const newRole = enableDealer ? 'dealer' : 'customer';
    await update(ref(db, `users/${uid}`), {
      role: newRole
    });

    const idx = cachedUsers.findIndex(u => u.uid === uid);
    if (idx !== -1) {
      cachedUsers[idx].role = newRole;
      notifyListeners();
    }
    return { success: true };
  } catch (err: any) {
    console.error("Assign dealer role failed:", err);
    return { success: false, error: err.message || 'ڈیلر رول تبدیل کرنے میں غلطی پیش آئی۔' };
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
  const refundAmount = booking.firstAmount + booking.secondAmount;
  const refundTxId = 'refund-' + bookingId;

  try {
    const userSnap = await get(ref(db, `users/${cached.uid}`));
    if (!userSnap.exists()) {
      throw new Error('کسٹمر کا والٹ ریکارڈ موجود نہیں ہے۔');
    }
    const userData = userSnap.val() as User;

    const refundTx: Transaction = {
      id: refundTxId,
      userId: cached.uid!,
      userEmail: userEmail,
      userName: userData.name || cached.name || 'صارف',
      type: 'refund',
      amount: refundAmount,
      date: new Date().toISOString(),
      status: 'approved',
      bookingId: bookingId,
      note: `بکنگ #${bookingId} کی منسوخی پر والٹ ریفنڈ`
    };

    const updates: Record<string, any> = {};
    updates[`transactions/${refundTxId}`] = refundTx;
    updates[`users/${cached.uid}/balance`] = (userData.balance || 0) + refundAmount;
    updates[`users/${cached.uid}/lastRefundBookingId`] = bookingId;
    updates[`bookings/${bookingId}`] = null;

    await update(ref(db), updates);
    return { success: true };
  } catch (err: any) {
    console.error("Cancel booking failed:", err);
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
  const refundAmount = booking.firstAmount + booking.secondAmount;
  const refundTxId = 'refund-' + bookingId;

  try {
    const userSnap = await get(ref(db, `users/${cached.uid}`));
    if (!userSnap.exists()) {
      throw new Error('کسٹمر کا والٹ ریکارڈ موجود نہیں ہے۔');
    }
    const userData = userSnap.val() as User;

    const refundTx: Transaction = {
      id: refundTxId,
      userId: cached.uid!,
      userEmail: userEmail,
      userName: userData.name || cached.name || 'صارف',
      type: 'refund',
      amount: refundAmount,
      date: new Date().toISOString(),
      status: 'approved',
      bookingId: bookingId,
      note: `ایڈمن کی جانب سے بکنگ #${bookingId} کی منسوخی پر والٹ ریفنڈ`
    };

    const updates: Record<string, any> = {};
    updates[`transactions/${refundTxId}`] = refundTx;
    updates[`users/${cached.uid}/balance`] = (userData.balance || 0) + refundAmount;
    updates[`users/${cached.uid}/lastRefundBookingId`] = bookingId;
    updates[`bookings/${bookingId}`] = null;

    await update(ref(db), updates);
    return { success: true };
  } catch (err: any) {
    console.error("Admin cancel booking failed:", err);
    return { success: false, error: err.message || 'منسوخی کے دوران غلطی پیش آئی۔' };
  }
}

export async function setOrUpdateLimit(
  category: DrawCategory,
  number: string,
  firstLimitOrMax: number,
  secondLimit?: number,
  drawId?: string
): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'انٹرنیٹ کنکشن موجود نہیں ہے۔' };

  if (!isLoggedUserAdminOrSuper() && !isLoggedUserDataEntry()) {
    return { success: false, error: 'صرف ایڈمن کو لمٹ تبدیل کرنے کا اختیار ہے۔' };
  }

  const normalized = normalizeBookingNumber(number);
  if (!normalized) {
    return { success: false, error: 'براہ کرم درست نمبر درج کریں۔' };
  }

  const firstPrizeAmountLimit = typeof firstLimitOrMax === 'number' && !isNaN(firstLimitOrMax) ? Math.max(0, firstLimitOrMax) : 0;
  const secondPrizeAmountLimit = typeof secondLimit === 'number' && !isNaN(secondLimit) ? Math.max(0, secondLimit) : firstPrizeAmountLimit;
  const maxAmount = Math.max(firstPrizeAmountLimit, secondPrizeAmountLimit);

  const existing = cachedLimits.find(l => (drawId ? l.drawId === drawId : l.category === category) && normalizeBookingNumber(l.number) === normalized);
  const limitId = existing ? existing.id : 'limit-' + Date.now();
  
  const limit: NumberLimit = {
    id: limitId,
    category,
    number: normalized,
    maxAmount,
    firstPrizeAmountLimit,
    secondPrizeAmountLimit,
    ...(drawId && { drawId })
  };
  await set(ref(db, `limits/${limitId}`), limit);

  const idx = cachedLimits.findIndex(l => l.id === limitId);
  if (idx !== -1) {
    cachedLimits[idx] = limit;
  } else {
    cachedLimits.push(limit);
  }
  notifyListeners();
  return { success: true };
}

export async function deleteLimit(id: string): Promise<void> {
  const online = await checkInternetConnection();
  if (!online) return;
  await remove(ref(db, `limits/${id}`));

  cachedLimits = cachedLimits.filter(l => l.id !== id);
  notifyListeners();
}

/**
 * Authoritative check if a number is marked as Hard Favorite / Blocked.
 * Normalizes the input (handling Urdu/Arabic digits, stripping spaces/hyphens/hashes, preserving leading zeroes).
 */
export async function checkIsNumberHardFavorite(
  category: DrawCategory,
  number: string,
  drawId?: string
): Promise<boolean> {
  const norm = normalizeBookingNumber(number);
  if (!norm) return false;

  // Fast check in memory cache if populated
  if (cachedHardFavoriteNumbers && cachedHardFavoriteNumbers.length > 0) {
    const isCachedBlocked = cachedHardFavoriteNumbers.some(hf => {
      if (hf.isArchived) return false;
      if (normalizeBookingNumber(hf.number) !== norm) return false;
      const catMatch = hf.category === 'all' || hf.category === category;
      if (!catMatch) return false;
      if (hf.drawId && drawId && hf.drawId !== drawId) return false;
      return true;
    });
    if (isCachedBlocked) return true;
  }

  // Authoritative real-time check directly against database for all accounts
  try {
    const snap = await get(ref(db, 'hardFavoriteNumbers'));
    if (snap.exists()) {
      const val = snap.val();
      const list: HardFavoriteNumber[] = Object.keys(val).map(k => ({ ...val[k], id: val[k].id || k }));
      return list.some(hf => {
        if (hf.isArchived) return false;
        if (normalizeBookingNumber(hf.number) !== norm) return false;
        const catMatch = hf.category === 'all' || hf.category === category;
        if (!catMatch) return false;
        if (hf.drawId && drawId && hf.drawId !== drawId) return false;
        return true;
      });
    }
  } catch (err) {
    console.error('[HardFavorite] Error querying database for validation:', err);
  }

  return false;
}

export async function addHardFavoriteNumber(
  category: DrawCategory | 'all',
  rawNumber: string,
  note?: string,
  drawId?: string
): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'NO_INTERNET' };

  if (!isLoggedUserAdminOrSuper() && !isLoggedUserDataEntry()) {
    return { success: false, error: 'صرف ایڈمن کو ہارڈ فیورٹ نمبر شامل کرنے کی اجازت ہے۔' };
  }

  const normalized = normalizeBookingNumber(rawNumber);
  if (!normalized) {
    return { success: false, error: 'براہ کرم درست نمبر درج کریں۔' };
  }

  if (!/^\d+$/.test(normalized)) {
    return { success: false, error: 'نمبر میں صرف ہندسے (0-9) ہونے چاہئیں۔' };
  }

  try {
    const snap = await get(ref(db, 'hardFavoriteNumbers'));
    const val = snap.exists() ? snap.val() : {};
    const existingList: HardFavoriteNumber[] = Object.keys(val).map(k => ({ ...val[k], id: val[k].id || k }));

    const isDuplicate = existingList.some(hf => {
      if (hf.isArchived) return false;
      if (normalizeBookingNumber(hf.number) !== normalized) return false;
      if (category === 'all' || hf.category === 'all' || hf.category === category) {
        if (drawId && hf.drawId && hf.drawId !== drawId) return false;
        return true;
      }
      return false;
    });

    if (isDuplicate) {
      return { success: false, error: `نمبر ${normalized} پہلے سے ہارڈ فیورٹ / بلاک لسٹ میں موجود ہے۔` };
    }

    const id = 'hf-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const newEntry: HardFavoriteNumber = {
      id,
      category,
      number: normalized,
      createdAt: new Date().toISOString(),
      createdBy: auth.currentUser?.email || 'admin',
      ...(note?.trim() && { note: note.trim() }),
      ...(drawId && { drawId }),
      isArchived: false
    };

    await set(ref(db, `hardFavoriteNumbers/${id}`), newEntry);

    const idx = cachedHardFavoriteNumbers.findIndex(h => h.id === id);
    if (idx !== -1) {
      cachedHardFavoriteNumbers[idx] = newEntry;
    } else {
      cachedHardFavoriteNumbers.unshift(newEntry);
    }
    notifyListeners();
    return { success: true };
  } catch (err: any) {
    console.error('[HardFavorite] Error adding entry:', err);
    return { success: false, error: err.message || 'ہارڈ فیورٹ نمبر شامل کرنے میں خرابی پیش آئی۔' };
  }
}

export async function removeHardFavoriteNumber(id: string): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: 'NO_INTERNET' };

  if (!isLoggedUserAdminOrSuper() && !isLoggedUserDataEntry()) {
    return { success: false, error: 'صرف ایڈمن کو ہارڈ فیورٹ نمبر ہٹانے کی اجازت ہے۔' };
  }

  try {
    await remove(ref(db, `hardFavoriteNumbers/${id}`));
    cachedHardFavoriteNumbers = cachedHardFavoriteNumbers.filter(h => h.id !== id);
    notifyListeners();
    return { success: true };
  } catch (err: any) {
    console.error('[HardFavorite] Error removing entry:', err);
    return { success: false, error: err.message || 'ہارڈ فیورٹ نمبر ہٹانے میں خرابی پیش آئی۔' };
  }
}

export function getDemands(): Demand[] {
  return cachedDemands;
}

export async function saveDemands(demands: Demand[]): Promise<void> {
  const online = await checkInternetConnection();
  if (!online) return;
  const updates: Record<string, any> = {};
  for (const d of demands) {
    updates[`demands/${d.id}`] = d;
  }
  if (Object.keys(updates).length > 0) {
    await update(ref(db), updates);
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
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'NO_INTERNET' };
  }

  const normalizedEmail = email.toLowerCase();
  const user = cachedUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) return { success: false, error: 'کسٹمر ریکارڈ نہیں ملا' };

  // HARD FAVORITE / BLOCKED CHECK
  const isHardFavBlocked = await checkIsNumberHardFavorite(category, number, drawId);
  if (isHardFavBlocked) {
    return { success: false, error: 'یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔' };
  }

  const totalCost = firstAmount + secondAmount;
  if (user.balance < totalCost) {
    return { success: false, error: 'آپ کے والٹ میں کافی رقم موجود نہیں ہے' };
  }

  const demandId = 'demand-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

  // Capture dealer identity at Demand creation time.
  const isDealer = user.role === 'dealer';

  const newDemand: Demand = {
    id: demandId,
    userEmail: normalizedEmail,
    ...(isDealer && { requesterRole: 'dealer' as const }),
    ...(isDealer && user.uid && { dealerId: user.uid }),
    ...(isDealer && { dealerEmail: user.email || normalizedEmail }),
    ...(isDealer && { dealerName: user.name || 'ڈیلر' }),
    category,
    number,
    firstAmount,
    secondAmount,
    timestamp: new Date().toISOString(),
    status: 'pending',
    ...(drawId && { drawId }),
    ...(bondValue && { bondValue }),
    ...(drawNumber && { drawNumber }),
    ...(drawCity && { drawCity }),
    ...(drawDate && { drawDate })
  };

  try {
    await set(ref(db, `demands/${demandId}`), newDemand);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'ڈیمانڈ بھیجنے کے دوران غلطی پیش آئی۔' };
  }
}

export async function approveDemand(
  demandId: string
): Promise<{ success: boolean; error?: string }> {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: 'NO_INTERNET' };
  }

  const demand = cachedDemands.find(d => d.id === demandId);

  if (!demand) {
    return { success: false, error: 'ڈیمانڈ ریکارڈ نہیں ملا' };
  }

  if (demand.status !== 'pending') {
    return {
      success: false,
      error: 'یہ ڈیمانڈ پہلے ہی عمل میں لائی جا چکی ہے'
    };
  }

  const userEmail = demand.userEmail.toLowerCase().trim();

  const cached = cachedUsers.find(
    u => u.email && u.email.toLowerCase().trim() === userEmail
  );

  if (!cached?.uid) {
    return {
      success: false,
      error: 'صارف کا ریکارڈ (یا یو آئی ڈی) نہیں ملا۔'
    };
  }

  /*
   * IMPORTANT:
   * The requester role is captured when the Demand is created.
   * Do not guess the destination collection from the email at
   * approval time. Legacy demands without requesterRole are
   * resolved from the current cached user role.
   */
  const requesterRole: 'customer' | 'dealer' =
    demand.requesterRole ||
    (cached.role === 'dealer' ? 'dealer' : 'customer');

  const isDealer = requesterRole === 'dealer';

  const bookingId =
    (isDealer ? 'dlr-booking-' : 'booking-') +
    Date.now() +
    '-' +
    Math.floor(Math.random() * 1000);

  const bookingCollection = isDealer ? 'dealerBookings' : 'bookings';
  const txId = 'tx-booking-' + bookingId;

  try {
    const demandSnap = await get(ref(db, `demands/${demandId}`));
    if (!demandSnap.exists()) {
      throw new Error('ڈیمانڈ ریکارڈ نہیں ملا');
    }

    const currentDemand = demandSnap.val() as Demand;
    if (currentDemand.status !== 'pending') {
      throw new Error('یہ ڈیمانڈ پہلے ہی عمل میں لائی جا چکی ہے');
    }

    const userSnap = await get(ref(db, `users/${cached.uid}`));
    if (!userSnap.exists()) {
      throw new Error('صارف کا ریکارڈ نہیں ملا');
    }

    const userData = userSnap.val() as User;
    const currentBalance = userData.balance ?? 0;

    const totalCost =
      (currentDemand.firstAmount || 0) +
      (currentDemand.secondAmount || 0);

    if (totalCost <= 0) {
      throw new Error('ڈیمانڈ کی رقم درست نہیں ہے');
    }

    if (currentBalance < totalCost) {
      throw new Error('صارف کے والٹ میں کافی رقم موجود نہیں ہے');
    }

    // HARD FAVORITE / BLOCKED CHECK
    const isHardFavBlocked = await checkIsNumberHardFavorite(currentDemand.category, currentDemand.number, currentDemand.drawId);
    if (isHardFavBlocked) {
      throw new Error('یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔');
    }

    let bookingObj: Booking | DealerBooking;
    if (isDealer) {
      bookingObj = {
        id: bookingId,
        dealerId: cached.uid,
        dealerEmail:
          userData.email ||
          currentDemand.dealerEmail ||
          userEmail,
        dealerName:
          userData.name ||
          currentDemand.dealerName ||
          cached.name ||
          'ڈیلر',
        category: currentDemand.category,
        number: currentDemand.number,
        firstAmount: currentDemand.firstAmount,
        secondAmount: currentDemand.secondAmount,
        timestamp: new Date().toISOString(),
        ...(currentDemand.drawId && {
          drawId: currentDemand.drawId
        }),
        ...(currentDemand.bondValue && {
          bondValue: currentDemand.bondValue
        }),
        ...(currentDemand.drawNumber && {
          drawNumber: currentDemand.drawNumber
        }),
        ...(currentDemand.drawCity && {
          drawCity: currentDemand.drawCity
        }),
        ...(currentDemand.drawDate && {
          drawDate: currentDemand.drawDate
        })
      } as DealerBooking;
    } else {
      bookingObj = {
        id: bookingId,
        userEmail: currentDemand.userEmail,
        category: currentDemand.category,
        number: currentDemand.number,
        firstAmount: currentDemand.firstAmount,
        secondAmount: currentDemand.secondAmount,
        timestamp: new Date().toISOString(),
        ...(currentDemand.drawId && {
          drawId: currentDemand.drawId
        }),
        ...(currentDemand.bondValue && {
          bondValue: currentDemand.bondValue
        }),
        ...(currentDemand.drawNumber && {
          drawNumber: currentDemand.drawNumber
        }),
        ...(currentDemand.drawCity && {
          drawCity: currentDemand.drawCity
        }),
        ...(currentDemand.drawDate && {
          drawDate: currentDemand.drawDate
        })
      } as Booking;
    }

    const categoryLabelMap: Record<DrawCategory, string> = {
      pakistan_bond: 'پاکستان پرائز بانڈ',
      thailand_lottery: 'تھائی لینڈ لاٹری'
    };

    const tx: Transaction = {
      id: txId,
      userId: cached.uid,
      userEmail:
        userData.email ||
        currentDemand.userEmail ||
        userEmail,
      userName:
        userData.name ||
        cached.name ||
        (isDealer ? 'ڈیلر' : 'صارف'),
      type: 'booking_deduction',
      amount: totalCost,
      date: new Date().toISOString(),
      status: 'approved',
      bookingId: bookingId,
      note:
        `${categoryLabelMap[currentDemand.category] || currentDemand.category} ` +
        `نمبر #${currentDemand.number} ` +
        `${isDealer ? 'ڈیلر ' : ''}بکنگ ڈیمانڈ منظوری کٹوتی`
    };

    const updates: Record<string, any> = {};
    updates[`${bookingCollection}/${bookingId}`] = bookingObj;
    updates[`transactions/${txId}`] = tx;
    updates[`users/${cached.uid}/balance`] = currentBalance - totalCost;
    updates[`users/${cached.uid}/lastBookingId`] = bookingId;
    updates[`demands/${demandId}/status`] = 'approved';

    await update(ref(db), updates);

    cached.balance =
      (cached.balance || 0) -
      ((demand.firstAmount || 0) + (demand.secondAmount || 0));

    demand.status = 'approved';
    notifyListeners();

    return { success: true };
  } catch (err: any) {
    console.error(
      'Approve demand transaction failed:',
      err
    );

    return {
      success: false,
      error:
        err.message ||
        'ڈیمانڈ منظور کرنے کے دوران غلطی پیش آئی۔'
    };
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
    await update(ref(db, `demands/${demandId}`), {
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
  const updates: Record<string, any> = {};
  for (const d of deadlines) {
    const targetId = d.id || d.category;
    updates[`deadlines/${targetId}`] = { ...d, id: targetId };
  }
  if (Object.keys(updates).length > 0) {
    await update(ref(db), updates);
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
    bookingStatusUrdu: bookingStatusUrdu || (status === 'closed' || status === 'result_announced' ? 'بکنگ بند ہے' : 'بکنگ کھول گئی'),
    ...(nextPrizeBondValue !== undefined && { nextPrizeBondValue }),
    ...(nextDrawCity !== undefined && { nextDrawCity }),
    ...(nextDrawNumber !== undefined && { nextDrawNumber }),
    ...(nextDrawDate !== undefined && { nextDrawDate }),
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
  await set(ref(db, `deadlines/${targetDocId}`), deadline);

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
  await remove(ref(db, `deadlines/${id}`));
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
  if (cachedThaiLotteryResults.length === 0) {
    return thailandLotteryDraws;
  }
  return cachedThaiLotteryResults;
}

export async function autoCleanOldDrawData(category: 'pakistan_bond' | 'thailand_lottery', targetDrawId?: string): Promise<void> {
  if (!targetDrawId) {
    console.log(`[Store] No targetDrawId provided for autoCleanOldDrawData (${category}). Skipping archiving of active draws.`);
    return;
  }

  try {
    console.log(`Starting auto archiving for completed draw data of category: ${category}, drawId: ${targetDrawId}`);
    
    const updates: Record<string, any> = {};

    // 1. Archive customer and admin bookings of this specific draw only
    const bookingsSnap = await get(ref(db, 'bookings'));
    if (bookingsSnap.exists()) {
      const val = bookingsSnap.val();
      for (const id of Object.keys(val)) {
        if (val[id]?.drawId === targetDrawId) {
          updates[`bookings/${id}/isArchived`] = true;
        }
      }
    }

    // 2. Archive dealer bookings of this specific draw only
    const dealerBookingsSnap = await get(ref(db, 'dealerBookings'));
    if (dealerBookingsSnap.exists()) {
      const val = dealerBookingsSnap.val();
      for (const id of Object.keys(val)) {
        if (val[id]?.drawId === targetDrawId) {
          updates[`dealerBookings/${id}/isArchived`] = true;
        }
      }
    }

    // 3. Archive demands of this specific draw only
    const demandsSnap = await get(ref(db, 'demands'));
    if (demandsSnap.exists()) {
      const val = demandsSnap.val();
      for (const id of Object.keys(val)) {
        if (val[id]?.drawId === targetDrawId) {
          updates[`demands/${id}/isArchived`] = true;
        }
      }
    }

    // 4. Archive number limits of this specific draw only
    const limitsSnap = await get(ref(db, 'limits'));
    if (limitsSnap.exists()) {
      const val = limitsSnap.val();
      for (const id of Object.keys(val)) {
        if (val[id]?.drawId === targetDrawId) {
          updates[`limits/${id}/isArchived`] = true;
        }
      }
    }

    // 5. Update the related draw deadline document to result_announced
    const matchingDeadline = cachedDeadlines.find(
      d => d.id === targetDrawId || d.drawId === targetDrawId
    );
    const deadlineDocId = matchingDeadline?.id || targetDrawId;

    updates[`deadlines/${deadlineDocId}/status`] = 'result_announced';
    updates[`deadlines/${deadlineDocId}/bookingStatusUrdu`] = 'بکنگ بند ہے';
    updates[`deadlines/${deadlineDocId}/isArchived`] = false;
    updates[`deadlines/${deadlineDocId}/updatedAt`] = new Date().toISOString();

    if (Object.keys(updates).length > 0) {
      await update(ref(db), updates);
    }

    const idx = cachedDeadlines.findIndex(
      d => d.id === deadlineDocId || d.drawId === targetDrawId
    );

    if (idx !== -1) {
      cachedDeadlines[idx] = {
        ...cachedDeadlines[idx],
        status: 'result_announced',
        bookingStatusUrdu: 'بکنگ بند ہے',
        isArchived: false
      };
    }

    notifyListeners();
  } catch (err) {
    console.error("Auto archiving of completed draw data failed:", err);
    throw err;
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
    await set(ref(db, `${colName}/${result.id}`), result);

    // Update local cache immediately
    if (result.category === 'pakistan_bond') {
      const pb = result as PakistanBondResult;
      const idx = cachedPakistanBondResults.findIndex(r => r.id === pb.id);
      if (idx !== -1) cachedPakistanBondResults[idx] = pb;
      else cachedPakistanBondResults.push(pb);
      cachedPakistanBondResults = sortResultsChronological(cachedPakistanBondResults);
    } else {
      const tl = result as ThaiLotteryResult;
      const idx = cachedThaiLotteryResults.findIndex(r => r.id === tl.id);
      if (idx !== -1) cachedThaiLotteryResults[idx] = tl;
      else cachedThaiLotteryResults.push(tl);
      cachedThaiLotteryResults = sortResultsChronological(cachedThaiLotteryResults);
    }
    notifyListeners();

    // Archive completed draw data automatically for the related draw only
    if (result.drawId) {
      await autoCleanOldDrawData(result.category, result.drawId);
    }

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
    await update(ref(db, `${colName}/${result.id}`), result);

    // Update local cache immediately
    if (result.category === 'pakistan_bond') {
      const pb = result as PakistanBondResult;
      const idx = cachedPakistanBondResults.findIndex(r => r.id === pb.id);
      if (idx !== -1) cachedPakistanBondResults[idx] = pb;
      else cachedPakistanBondResults.push(pb);
      cachedPakistanBondResults = sortResultsChronological(cachedPakistanBondResults);
    } else {
      const tl = result as ThaiLotteryResult;
      const idx = cachedThaiLotteryResults.findIndex(r => r.id === tl.id);
      if (idx !== -1) cachedThaiLotteryResults[idx] = tl;
      else cachedThaiLotteryResults.push(tl);
      cachedThaiLotteryResults = sortResultsChronological(cachedThaiLotteryResults);
    }
    notifyListeners();

    // Only clean draw data if linked to an active unannounced draw; do not modify unrelated draws or historical records
    if (result.drawId) {
      const activeMatchingDeadline = cachedDeadlines.find(
        d => (d.id === result.drawId || d.drawId === result.drawId) && d.status !== 'result_announced'
      );
      if (activeMatchingDeadline) {
        await autoCleanOldDrawData(result.category, result.drawId);
      }
    }

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
    await remove(ref(db, `${colName}/${id}`));
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
