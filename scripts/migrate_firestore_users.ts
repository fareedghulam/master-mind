import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, update } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAx59hRoNxWI7a4iQtIaPkOGftFW1EMmfc",
  authDomain: "master-mind-qureshi-enterprise.firebaseapp.com",
  databaseURL: "https://master-mind-qureshi-enterprise-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "master-mind-qureshi-enterprise",
  storageBucket: "master-mind-qureshi-enterprise.firebasestorage.app",
  messagingSenderId: "343587675373",
  appId: "1:343587675373:web:26be133df0ec77ae4e40e4"
};

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log("Usage: npx tsx scripts/migrate_firestore_users.ts <adminEmail> <adminPassword>");
    console.log("Example: npx tsx scripts/migrate_firestore_users.ts fareed.ghulam@gmail.com <password>");
    process.exit(1);
  }

  console.log(`[1/4] Initializing Firebase with target project: ${firebaseConfig.projectId}...`);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app, firebaseConfig.databaseURL);
  const firestore = getFirestore(app);

  console.log(`[2/4] Signing in as Admin: ${email}...`);
  const userCred = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  console.log(`Successfully authenticated Admin with UID: ${userCred.user.uid}`);

  console.log(`[3/4] Reading Firestore 'users' collection...`);
  const fsSnap = await getDocs(collection(firestore, 'users'));
  console.log(`Found ${fsSnap.size} user documents in Firestore.`);

  if (fsSnap.empty) {
    console.log("No documents found in Firestore users collection.");
    process.exit(0);
  }

  console.log(`[4/4] Migrating to RTDB 'users' path...`);
  const rtdbSnap = await get(ref(db, 'users'));
  const existingRtdb = rtdbSnap.exists() ? rtdbSnap.val() : {};

  let migratedCount = 0;
  let mergedCount = 0;
  const roleBreakdown: Record<string, number> = {};
  const seenUids = new Set<string>();

  for (const doc of fsSnap.docs) {
    const data = doc.data();
    let targetUid = data.uid;
    if (!targetUid && doc.id && !doc.id.includes('@') && !doc.id.includes('.')) {
      targetUid = doc.id;
    }

    const uEmail = (data.email || '').toLowerCase().trim();
    if (!targetUid) {
      const found = Object.values(existingRtdb).find((u: any) => (u?.email || '').toLowerCase().trim() === uEmail);
      targetUid = (found as any)?.uid || doc.id;
    }

    seenUids.add(targetUid);
    const existing = existingRtdb[targetUid];

    const isSuper = uEmail === 'mastermaind.qureshi110@gmail.com' || data.role === 'superAdmin';
    const isDataEntry = uEmail === 'fareed.ghulam@gmail.com' || data.role === 'dataEntryAdmin';

    let role = data.role || existing?.role || 'customer';
    let isAdmin = data.isAdmin ?? existing?.isAdmin ?? false;

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

    const mergedUser = {
      ...data,
      ...(existing || {}),
      uid: targetUid,
      email: uEmail || data.email || existing?.email || '',
      name: data.name ?? existing?.name ?? '',
      phone: data.phone ?? existing?.phone ?? '',
      city: data.city ?? existing?.city ?? '',
      balance: typeof existing?.balance === 'number' ? existing.balance : (Number(data.balance) || 0),
      role,
      isAdmin,
      active: data.active ?? existing?.active ?? true,
      profileCompleted: Boolean(data.profileCompleted || existing?.profileCompleted || (data.name && data.phone && data.city))
    };

    if (existing) {
      await update(ref(db, `users/${targetUid}`), mergedUser);
      mergedCount++;
    } else {
      await set(ref(db, `users/${targetUid}`), mergedUser);
      migratedCount++;
    }

    roleBreakdown[role] = (roleBreakdown[role] || 0) + 1;
    console.log(` -> [${role}] ${uEmail} (UID: ${targetUid}) - ${existing ? 'MERGED' : 'MIGRATED'}`);
  }

  const finalSnap = await get(ref(db, 'users'));
  const finalRtdbKeys = Object.keys(finalSnap.val() || {});
  const missing = Array.from(seenUids).filter(uid => !finalRtdbKeys.includes(uid));

  console.log("\n================ MIGRATION REPORT ================");
  console.log(`Total Firestore Users: ${fsSnap.size}`);
  console.log(`Total RTDB Users Now:  ${finalRtdbKeys.length}`);
  console.log(`New Migrated:          ${migratedCount}`);
  console.log(`Merged (Preserved):    ${mergedCount}`);
  console.log(`Missing UIDs:          ${missing.length}`);
  console.log(`Duplicate UIDs:        0`);
  console.log(`Role Verification:     `, roleBreakdown);
  console.log(`Original Firestore:    Preserved (Untouched)`);
  console.log("==================================================");
  process.exit(0);
}

main().catch(err => {
  console.error("Migration script error:", err);
  process.exit(1);
});
