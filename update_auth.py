import os

# JavaScript کا نیا کوڈ
js_code = '''import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const registerUser = async (email, password, extraData) => {
  try {
    // 1. Firebase Auth میں اکاؤنٹ بنائیں
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Firestore کے 'users' کلیکشن میں ڈیٹا محفوظ کریں
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      name: extraData.name,
      createdAt: new Date(),
    });

    console.log("User registered & data saved!");
    return { success: true, user };
  } catch (error) {
    console.error("Registration Error:", error.message);
    return { success: false, error: error.message };
  }
};
'''

# فائل کا پاتھ (آپ کی پروجیکٹ ڈائریکٹری کے حساب سے)
file_path = "src/authService.js"

# اگر src فولڈر نہ ہو تو بنائیں
os.makedirs(os.path.dirname(file_path), exist_ok=True)

# فائل لکھیں
with open(file_path, "w", encoding="utf-8") as f:
    f.write(js_code)

print(f"✓ فائل کامیابی سے اپڈیٹ ہو گئی: {file_path}")
