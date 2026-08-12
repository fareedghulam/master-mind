import os

# 1. firebaseConfig.js کو سیشن سیونگ (Persistence) کے ساتھ اپڈیٹ کریں
firebase_config_code = '''import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// APK میں لاگ ان سیشن ہمیشہ محفوظ رکھنے کی سیٹنگ
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.log("Persistence error:", err);
});
'''

# 2. authService.js میں ڈیٹا لانے اور سنک کرنے کا فنکشن
auth_service_code = '''import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const listenToAuthAndFetchProfile = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          callback({ user, profile: userSnap.data(), loading: false });
        } else {
          callback({ user, profile: null, loading: false, error: "Profile missing" });
        }
      } catch (err) {
        console.error("Firestore fetch error:", err);
        callback({ user, profile: null, loading: false, error: err.message });
      }
    } else {
      callback({ user: null, profile: null, loading: false });
    }
  });
};
'''

# 3. Dashboard.jsx فائل اپڈیٹ کریں
dashboard_code = '''import React, { useEffect, useState } from "react";
import { listenToAuthAndFetchProfile } from "../authService";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToAuthAndFetchProfile(({ user, profile, loading }) => {
      if (profile) {
        setUserData(profile);
      }
      setLoading(loading);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#fff", backgroundColor: "#0f172a", minHeight: "100vh" }}>
        <h2>ڈیٹا لوڈ ہو رہا ہے... براہ کرم انتظار کریں</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", color: "#fff", backgroundColor: "#0f172a", minHeight: "100vh" }}>
      <h1>محترم {userData?.name || "صاحب"}!</h1>
      <div style={{ background: "#1e293b", padding: "15px", borderRadius: "10px", marginTop: "15px" }}>
        <h3>والٹ بیلنس: Rs. {userData?.wallet ?? 0}</h3>
        <p>شہر: {userData?.city || "سیٹ نہیں ہوا"}</p>
        <p>موبائل: {userData?.phone || userData?.mobile || "سیٹ نہیں ہوا"}</p>
      </div>
    </div>
  );
}
'''

# فائلیں سیو کریں
with open("src/firebaseConfig.js", "w", encoding="utf-8") as f:
    f.write(firebase_config_code)

with open("src/authService.js", "w", encoding="utf-8") as f:
    f.write(auth_service_code)

os.makedirs("src/pages", exist_ok=True)
with open("src/pages/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(dashboard_code)

print("✓ تمام جاوا اسکرپٹ اور Firebase فائلز کامیابی سے فکس اور اپڈیٹ ہو گئی ہیں!")
