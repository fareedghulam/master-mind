import os

js_code = '''import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// 1. یوزر کا ڈیٹا Firestore سے لوڈ (Fetch) کرنا
export const getUserProfile = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: "یوزر کا ڈیٹا نہیں ملا" };
    }
  } catch (error) {
    console.error("Fetch Profile Error:", error.message);
    return { success: false, error: error.message };
  }
};

// 2. یوزر رجسٹریشن (User Registration)
export const registerUser = async (email, password, extraData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
      uid: user.uid,
      email: email,
      name: extraData.name || "",
      phone: extraData.phone || "",
      city: extraData.city || "",
      wallet: 0,
      createdAt: new Date(),
    };

    await setDoc(doc(db, "users", user.uid), userData);
    return { success: true, user, data: userData };
  } catch (error) {
    console.error("Registration Error:", error.message);
    return { success: false, error: error.message };
  }
};

// 3. پروفائل اپڈیٹ (Profile Update)
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
    console.error("Profile Update Error:", error.message);
    return { success: false, error: error.message };
  }
};
'''

file_path = "src/authService.js"
os.makedirs(os.path.dirname(file_path), exist_ok=True)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(js_code)

print("✓ authService.js میں ڈیٹا پڑھنے (Fetch) اور اپڈیٹ کا تمام کوڈ کامیابی سے لگ گیا ہے!")
