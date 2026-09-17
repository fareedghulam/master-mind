import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyAx59hRoNxWI7a4iQtIaPkOGftFW1EMmfc",
  authDomain: "master-mind-qureshi-enterprise.firebaseapp.com",
  databaseURL: (import.meta as any).env?.VITE_FIREBASE_DATABASE_URL || "https://master-mind-qureshi-enterprise-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "master-mind-qureshi-enterprise",
  storageBucket: "master-mind-qureshi-enterprise.firebasestorage.app",
  messagingSenderId: "343587675373",
  appId: "1:343587675373:web:26be133df0ec77ae4e40e4"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app, firebaseConfig.databaseURL);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Explicitly persist Firebase Auth sessions across app restarts and browser reloads.
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('[FirebaseAuth] Failed to configure local persistence:', error);
});

