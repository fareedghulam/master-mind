import os

js_code = '''import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// 1. یوزر رجسٹریشن (User Registration)
export const registerUser = async (email, password, extraData) => {
  try {
    // Firebase Auth میں اکاؤنٹ بنائیں
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore میں یوزر کا تمام ڈیٹا محفوظ کریں
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      name: extraData.name || "",
      createdAt: new Date(),
    });

    console.log("User registered & data saved successfully!");
    return { success: true, user };
  } catch (error) {
    console.error("Registration Error:", error.message);
    return { success: false, error: error.message };
  }
};

// 2. پروفائل اپڈیٹ (Profile Update)
export const updateUserProfile = async (newProfileData) => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { success: false, error: "کوئی یوزر لاگ ان نہیں ہے" };
  }

  try {
    // Firebase Auth میں ڈسپلے نام اپڈیٹ کریں
    if (newProfileData.name) {
      await updateProfile(currentUser, { displayName: newProfileData.name });
    }

    // Firestore ڈیٹا بیس میں تفصیلات اپڈیٹ کریں
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      name: newProfileData.name || currentUser.displayName || "",
      bio: newProfileData.bio || "",
      phone: newProfileData.phone || "",
      updatedAt: new Date()
    });

    console.log("Profile updated successfully!");
    return { success: true };
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

print(f"✓ رجسٹریشن اور پروفائل اپڈیٹ دونوں کا کوڈ کامیابی سے شامل ہو گیا: {file_path}")
