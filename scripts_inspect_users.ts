// Inspect Firestore users collection and RTDB users path

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { firebaseConfig } from './src/lib/firebase';

async function fetchAllFirestoreUsers() {
  const docs: any[] = [];
  let pageToken = '';
  const baseUrl = `https://firestore.googleapis.com/v1/projects/master-mind-qureshi-enterprise/databases/(default)/documents/users?pageSize=100`;

  do {
    const url = pageToken ? `${baseUrl}&pageToken=${pageToken}` : baseUrl;
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Firestore fetch error: ${res.status} ${res.statusText}`);
      const errText = await res.text();
      console.error(errText);
      break;
    }
    const data = await res.json();
    if (data.documents) {
      for (const doc of data.documents) {
        const id = doc.name.split('/').pop();
        const fields: Record<string, any> = {};
        for (const [key, valObj] of Object.entries(doc.fields || {})) {
          fields[key] = parseFirestoreValue(valObj);
        }
        docs.push({ id, ...fields });
      }
    }
    pageToken = data.nextPageToken || '';
  } while (pageToken);

  return docs;
}

function parseFirestoreValue(valObj: any): any {
  if (valObj.stringValue !== undefined) return valObj.stringValue;
  if (valObj.integerValue !== undefined) return parseInt(valObj.integerValue, 10);
  if (valObj.doubleValue !== undefined) return parseFloat(valObj.doubleValue);
  if (valObj.booleanValue !== undefined) return valObj.booleanValue;
  if (valObj.timestampValue !== undefined) return valObj.timestampValue;
  if (valObj.nullValue !== undefined) return null;
  if (valObj.arrayValue !== undefined) {
    return (valObj.arrayValue.values || []).map(parseFirestoreValue);
  }
  if (valObj.mapValue !== undefined) {
    const map: Record<string, any> = {};
    for (const [k, v] of Object.entries(valObj.mapValue.fields || {})) {
      map[k] = parseFirestoreValue(v);
    }
    return map;
  }
  return valObj;
}

async function inspect() {
  console.log("=== INSPECTING FIRESTORE USERS ===");
  const fsUsers = await fetchAllFirestoreUsers();
  console.log(`Found ${fsUsers.length} Firestore users`);
  if (fsUsers.length > 0) {
    console.log("Sample Firestore user keys:", Object.keys(fsUsers[0]));
    console.log("Sample Firestore user 0:", JSON.stringify(fsUsers[0], null, 2));
    if (fsUsers.length > 1) {
      console.log("Sample Firestore user 1:", JSON.stringify(fsUsers[1], null, 2));
    }
  }

  // Count roles in Firestore users
  const fsRoles: Record<string, number> = {};
  for (const u of fsUsers) {
    const r = u.role || 'undefined';
    fsRoles[r] = (fsRoles[r] || 0) + 1;
  }
  console.log("Firestore roles breakdown:", fsRoles);

  console.log("\n=== INSPECTING RTDB USERS ===");
  const app = initializeApp(firebaseConfig, 'inspect-app');
  const auth = getAuth(app);
  const db = getDatabase(app, "https://master-mind-qureshi-enterprise-default-rtdb.asia-southeast1.firebasedatabase.app");

  // Sign in as admin to read RTDB users
  await signInWithEmailAndPassword(auth, 'mastermaind.qureshi110@gmail.com', 'Admin110@#');
  console.log("Logged in as admin to RTDB");

  const snap = await get(ref(db, 'users'));
  const rtdbUsers = snap.val() || {};
  const rtdbKeys = Object.keys(rtdbUsers);
  console.log(`Found ${rtdbKeys.length} RTDB user records`);
  if (rtdbKeys.length > 0) {
    console.log("Sample RTDB user key:", rtdbKeys[0]);
    console.log("Sample RTDB user 0:", JSON.stringify(rtdbUsers[rtdbKeys[0]], null, 2));
  }

  const rtdbRoles: Record<string, number> = {};
  for (const k of rtdbKeys) {
    const u = rtdbUsers[k];
    const r = u?.role || 'undefined';
    rtdbRoles[r] = (rtdbRoles[r] || 0) + 1;
  }
  console.log("RTDB roles breakdown:", rtdbRoles);
  
  process.exit(0);
}

inspect().catch(err => {
  console.error("Inspect error:", err);
  process.exit(1);
});
