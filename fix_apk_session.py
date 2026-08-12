import os

js_code = '''import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// 1. APK سیشن کا انتظار کرنے والا لسٹنر (AuthState Listener)
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const profileRes = await getUserProfile(user.uid);
      callback({ user, profile: profileRes.data || null, loading: false });
    } else {
      callback({ user: null, profile: null, loading: false });
    }
  });
};

// 2. یوزر کا ڈیٹا Firestore سے لانے کا فنکشن
export const getUserProfile = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: "ڈیٹا نہیں ملا" };
    }
  } catch (error) {
    console.error("Fetch Profile Error:", error.message);
    return { success: false, error: error.message };
  }
};

// 3. پروفائل اپڈیٹ
export const updateUserProfile = async (profileData) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return { success: false, error: "کوئی یوزر لاگ ان نہیں ہے" };

  try {
    if (profileData.name) {
      await updateProfile(currentUser, { displayName: profileData.name });
    }

    const userRef = doc(db, "users", currentUser.uid);
    const updatedFields = {
      name: profileData.name || "",
      phone: profileData.phone || profileData.mobile || "",
      city: profileData.city || "",
      updatedAt: new Date()
    };

    await updateDoc(userRef, updatedFields);
    return { success: true, data: updatedFields };
  } catch (error) {
    console.error("Update Error:", error.message);
    return { success: false, error: error.message };
  }
};
'''

file_path = "src/authService.js"
os.makedirs(os.path.dirname(file_path), exist_ok=True)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(js_code)

print("✓ authService.js میں Firebase Auth Listener کامیابی سے شامل ہو گیا ہے!")
