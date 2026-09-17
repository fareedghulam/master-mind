import { db, firestore } from '../lib/firebase';
import { ref, get, set, update } from 'firebase/database';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { User } from '../types';

export interface MigrationReport {
  success: boolean;
  firestoreCount: number;
  rtdbCount: number;
  migratedCount: number;
  mergedCount: number;
  missingUids: number;
  duplicateUids: number;
  roleVerification: Record<string, number>;
  fieldVerification: {
    totalProfilesChecked: number;
    profilesWithUid: number;
    profilesWithEmail: number;
    profilesWithName: number;
    profilesWithRole: number;
    profilesWithPhone: number;
  };
  firestoreDataPreserved: boolean;
  uids: string[];
  error?: string;
  details?: string[];
}

/**
 * Migrates a single authenticated user profile from Firestore to RTDB.
 * Preserves all fields, uses the Firebase Auth UID as the RTDB key.
 */
export async function migrateUserProfileFromFirestore(uid: string, email: string): Promise<User | null> {
  if (!uid) return null;
  const normalizedEmail = (email || '').toLowerCase().trim();
  const cleanEmailKey = normalizedEmail.replace(/[.#$\[\]]/g, '_');

  try {
    // 1. Try fetching by UID directly
    let fsDocSnap = await getDoc(doc(firestore, 'users', uid));
    
    // 2. Fallback: try by cleaned email key if document was saved with email key in legacy Firestore
    if (!fsDocSnap.exists() && cleanEmailKey) {
      const fallbackSnap = await getDoc(doc(firestore, 'users', cleanEmailKey));
      if (fallbackSnap.exists()) {
        fsDocSnap = fallbackSnap;
      }
    }

    // 3. Fallback: try by raw email
    if (!fsDocSnap.exists() && normalizedEmail) {
      const rawEmailSnap = await getDoc(doc(firestore, 'users', normalizedEmail));
      if (rawEmailSnap.exists()) {
        fsDocSnap = rawEmailSnap;
      }
    }

    if (!fsDocSnap.exists()) {
      return null;
    }

    const fsData = fsDocSnap.data() as Record<string, any>;
    
    // Check if user already exists in RTDB to merge safely
    const rtdbSnap = await get(ref(db, `users/${uid}`));
    const existingRtdbData = rtdbSnap.exists() ? (rtdbSnap.val() as Record<string, any>) : {};

    // Determine roles cleanly
    const isSuperAdminEmail = normalizedEmail === 'mastermaind.qureshi110@gmail.com';
    const isDataEntryEmail = normalizedEmail === 'fareed.ghulam@gmail.com';
    
    let resolvedRole = fsData.role || existingRtdbData.role || 'customer';
    let resolvedIsAdmin = fsData.isAdmin ?? existingRtdbData.isAdmin ?? false;

    if (isSuperAdminEmail || resolvedRole === 'superAdmin') {
      resolvedRole = 'superAdmin';
      resolvedIsAdmin = true;
    } else if (isDataEntryEmail || resolvedRole === 'dataEntryAdmin') {
      resolvedRole = 'dataEntryAdmin';
      resolvedIsAdmin = true;
    } else if (resolvedRole === 'admin' || resolvedIsAdmin === true) {
      resolvedRole = 'admin';
      resolvedIsAdmin = true;
    } else if (resolvedRole === 'dealer') {
      resolvedRole = 'dealer';
      resolvedIsAdmin = false;
    } else {
      resolvedRole = 'customer';
      resolvedIsAdmin = false;
    }

    // Safely construct user profile preserving all Firestore fields
    const migratedUser: User = {
      ...fsData,
      ...existingRtdbData,
      uid,
      email: normalizedEmail || fsData.email || existingRtdbData.email || '',
      name: fsData.name ?? existingRtdbData.name ?? '',
      phone: fsData.phone ?? existingRtdbData.phone ?? '',
      city: fsData.city ?? existingRtdbData.city ?? '',
      balance: typeof fsData.balance === 'number' 
        ? fsData.balance 
        : (typeof existingRtdbData.balance === 'number' ? existingRtdbData.balance : (Number(fsData.balance) || 0)),
      role: resolvedRole,
      isAdmin: resolvedIsAdmin,
      active: fsData.active ?? existingRtdbData.active ?? true,
      profileCompleted: Boolean(
        fsData.profileCompleted || 
        existingRtdbData.profileCompleted || 
        (fsData.name && fsData.phone && fsData.city)
      )
    };

    // Write to RTDB at users/{uid}
    await set(ref(db, `users/${uid}`), migratedUser);
    console.log(`[FirestoreToRTDB] Successfully migrated profile for ${normalizedEmail} (UID: ${uid}) to RTDB`);

    return migratedUser;
  } catch (err: any) {
    console.error(`[FirestoreToRTDB] Failed to migrate user ${email}:`, err);
    return null;
  }
}

/**
 * Migrates all users from Firestore 'users' collection to RTDB 'users' path.
 * Can be executed by authenticated Admins or during admin bootstrap.
 */
export async function migrateAllFirestoreUsersToRtdb(): Promise<MigrationReport> {
  const details: string[] = [];
  const report: MigrationReport = {
    success: false,
    firestoreCount: 0,
    rtdbCount: 0,
    migratedCount: 0,
    mergedCount: 0,
    missingUids: 0,
    duplicateUids: 0,
    roleVerification: {},
    fieldVerification: {
      totalProfilesChecked: 0,
      profilesWithUid: 0,
      profilesWithEmail: 0,
      profilesWithName: 0,
      profilesWithRole: 0,
      profilesWithPhone: 0
    },
    firestoreDataPreserved: true,
    uids: [],
    details
  };

  try {
    // 1. Read all Firestore users
    const fsSnapshot = await getDocs(collection(firestore, 'users'));
    report.firestoreCount = fsSnapshot.size;
    details.push(`Found ${fsSnapshot.size} user documents in Firestore.`);

    if (fsSnapshot.empty) {
      details.push("Firestore users collection is empty.");
      report.success = true;
      return report;
    }

    // 2. Fetch existing RTDB users to avoid unnecessary overwrites
    const rtdbSnap = await get(ref(db, 'users'));
    const existingRtdbUsers: Record<string, any> = rtdbSnap.exists() ? rtdbSnap.val() : {};

    const seenUids = new Set<string>();
    const duplicateUidSet = new Set<string>();

    for (const docSnap of fsSnapshot.docs) {
      const fsData = docSnap.data() as Record<string, any>;
      // Determine UID:
      // A: Explicit uid field in Firestore
      // B: docSnap.id if it is a valid Auth UID (typically 28 characters without special chars)
      let targetUid = fsData.uid;
      if (!targetUid && docSnap.id && !docSnap.id.includes('@') && !docSnap.id.includes('.')) {
        targetUid = docSnap.id;
      }

      const email = (fsData.email || '').toLowerCase().trim();

      if (!targetUid) {
        // If UID is missing, try looking up in RTDB by email to recover UID
        const foundInRtdb = Object.values(existingRtdbUsers).find(
          (u: any) => (u?.email || '').toLowerCase().trim() === email
        );
        if (foundInRtdb?.uid) {
          targetUid = foundInRtdb.uid;
        } else {
          targetUid = docSnap.id;
        }
      }

      if (seenUids.has(targetUid)) {
        duplicateUidSet.add(targetUid);
      }
      seenUids.add(targetUid);
      report.uids.push(targetUid);

      // Check if user already exists in RTDB
      const existingUser = existingRtdbUsers[targetUid];

      // Determine roles
      const isSuper = email === 'mastermaind.qureshi110@gmail.com' || fsData.role === 'superAdmin';
      const isDataEntry = email === 'fareed.ghulam@gmail.com' || fsData.role === 'dataEntryAdmin';

      let role = fsData.role || existingUser?.role || 'customer';
      let isAdmin = fsData.isAdmin ?? existingUser?.isAdmin ?? false;

      if (isSuper) {
        role = 'superAdmin';
        isAdmin = true;
      } else if (isDataEntry) {
        role = 'dataEntryAdmin';
        isAdmin = true;
      } else if (role === 'admin' || isAdmin === true) {
        role = 'admin';
        isAdmin = true;
      } else if (role === 'dealer') {
        role = 'dealer';
        isAdmin = false;
      } else {
        role = 'customer';
        isAdmin = false;
      }

      // Safe merge: preserve all Firestore fields, preserve RTDB live data
      const mergedUser: User = {
        ...fsData,
        ...(existingUser || {}),
        uid: targetUid,
        email: email || fsData.email || existingUser?.email || '',
        name: fsData.name ?? existingUser?.name ?? '',
        phone: fsData.phone ?? existingUser?.phone ?? '',
        city: fsData.city ?? existingUser?.city ?? '',
        balance: typeof existingUser?.balance === 'number'
          ? existingUser.balance
          : (typeof fsData.balance === 'number' ? fsData.balance : (Number(fsData.balance) || 0)),
        role,
        isAdmin,
        active: fsData.active ?? existingUser?.active ?? true,
        profileCompleted: Boolean(
          fsData.profileCompleted ||
          existingUser?.profileCompleted ||
          (fsData.name && fsData.phone && fsData.city)
        )
      };

      if (existingUser) {
        await update(ref(db, `users/${targetUid}`), mergedUser);
        report.mergedCount++;
      } else {
        await set(ref(db, `users/${targetUid}`), mergedUser);
        report.migratedCount++;
      }

      // Track roles
      report.roleVerification[role] = (report.roleVerification[role] || 0) + 1;

      // Field verification
      report.fieldVerification.totalProfilesChecked++;
      if (mergedUser.uid) report.fieldVerification.profilesWithUid++;
      if (mergedUser.email) report.fieldVerification.profilesWithEmail++;
      if (mergedUser.name) report.fieldVerification.profilesWithName++;
      if (mergedUser.role) report.fieldVerification.profilesWithRole++;
      if (mergedUser.phone) report.fieldVerification.profilesWithPhone++;
    }

    // Verify RTDB state after migration
    const finalRtdbSnap = await get(ref(db, 'users'));
    const finalRtdbUsers = finalRtdbSnap.exists() ? finalRtdbSnap.val() : {};
    const finalRtdbKeys = Object.keys(finalRtdbUsers);
    report.rtdbCount = finalRtdbKeys.length;

    // Check missing UIDs
    const missing = Array.from(seenUids).filter(uid => !finalRtdbKeys.includes(uid));
    report.missingUids = missing.length;
    report.duplicateUids = duplicateUidSet.size;

    report.success = report.missingUids === 0;
    details.push(`Migration complete: ${report.migratedCount} new, ${report.mergedCount} merged.`);
    details.push(`Total RTDB users: ${report.rtdbCount}, Missing UIDs: ${report.missingUids}, Duplicate UIDs: ${report.duplicateUids}`);

    return report;
  } catch (err: any) {
    report.error = err?.message || String(err);
    details.push(`Error during migration: ${report.error}`);
    console.error("[FirestoreToRTDB] Batch migration error:", err);
    return report;
  }
}

/**
 * Migrates user profiles provided from an external JSON backup/export array.
 * Ensures safety, merging, and UID validation.
 */
export async function migrateUsersFromJson(usersList: any[]): Promise<MigrationReport> {
  const details: string[] = [];
  const report: MigrationReport = {
    success: false,
    firestoreCount: usersList.length,
    rtdbCount: 0,
    migratedCount: 0,
    mergedCount: 0,
    missingUids: 0,
    duplicateUids: 0,
    roleVerification: {},
    fieldVerification: {
      totalProfilesChecked: 0,
      profilesWithUid: 0,
      profilesWithEmail: 0,
      profilesWithName: 0,
      profilesWithRole: 0,
      profilesWithPhone: 0
    },
    firestoreDataPreserved: true,
    uids: [],
    details
  };

  try {
    const rtdbSnap = await get(ref(db, 'users'));
    const existingRtdbUsers: Record<string, any> = rtdbSnap.exists() ? rtdbSnap.val() : {};

    const seenUids = new Set<string>();
    const duplicateUidSet = new Set<string>();

    for (const item of usersList) {
      const email = (item.email || '').toLowerCase().trim();
      const targetUid = item.uid || item.id;
      if (!targetUid) continue;

      if (seenUids.has(targetUid)) {
        duplicateUidSet.add(targetUid);
      }
      seenUids.add(targetUid);
      report.uids.push(targetUid);

      const existingUser = existingRtdbUsers[targetUid];

      const isSuper = email === 'mastermaind.qureshi110@gmail.com' || item.role === 'superAdmin';
      const isDataEntry = email === 'fareed.ghulam@gmail.com' || item.role === 'dataEntryAdmin';

      let role = item.role || existingUser?.role || 'customer';
      let isAdmin = item.isAdmin ?? existingUser?.isAdmin ?? false;

      if (isSuper) {
        role = 'superAdmin';
        isAdmin = true;
      } else if (isDataEntry) {
        role = 'dataEntryAdmin';
        isAdmin = true;
      } else if (role === 'admin' || isAdmin === true) {
        role = 'admin';
        isAdmin = true;
      } else if (role === 'dealer') {
        role = 'dealer';
        isAdmin = false;
      } else {
        role = 'customer';
        isAdmin = false;
      }

      const mergedUser: User = {
        ...item,
        ...(existingUser || {}),
        uid: targetUid,
        email: email || item.email || existingUser?.email || '',
        name: item.name ?? existingUser?.name ?? '',
        phone: item.phone ?? existingUser?.phone ?? '',
        city: item.city ?? existingUser?.city ?? '',
        balance: typeof existingUser?.balance === 'number'
          ? existingUser.balance
          : (typeof item.balance === 'number' ? item.balance : (Number(item.balance) || 0)),
        role,
        isAdmin,
        active: item.active ?? existingUser?.active ?? true,
        profileCompleted: Boolean(
          item.profileCompleted ||
          existingUser?.profileCompleted ||
          (item.name && item.phone && item.city)
        )
      };

      if (existingUser) {
        await update(ref(db, `users/${targetUid}`), mergedUser);
        report.mergedCount++;
      } else {
        await set(ref(db, `users/${targetUid}`), mergedUser);
        report.migratedCount++;
      }

      report.roleVerification[role] = (report.roleVerification[role] || 0) + 1;
      report.fieldVerification.totalProfilesChecked++;
      if (mergedUser.uid) report.fieldVerification.profilesWithUid++;
      if (mergedUser.email) report.fieldVerification.profilesWithEmail++;
      if (mergedUser.name) report.fieldVerification.profilesWithName++;
      if (mergedUser.role) report.fieldVerification.profilesWithRole++;
      if (mergedUser.phone) report.fieldVerification.profilesWithPhone++;
    }

    const finalRtdbSnap = await get(ref(db, 'users'));
    const finalRtdbUsers = finalRtdbSnap.exists() ? finalRtdbSnap.val() : {};
    const finalRtdbKeys = Object.keys(finalRtdbUsers);
    report.rtdbCount = finalRtdbKeys.length;

    const missing = Array.from(seenUids).filter(uid => !finalRtdbKeys.includes(uid));
    report.missingUids = missing.length;
    report.duplicateUids = duplicateUidSet.size;

    report.success = report.missingUids === 0;
    return report;
  } catch (err: any) {
    report.error = err?.message || String(err);
    return report;
  }
}
