import os

# اگر آپ کی ڈیش بورڈ کی فائل کا پاتھ مختلف ہے (مثلاً src/pages/Dashboard.jsx) تو اسے نیچے تبدیل کر سکتے ہیں
file_path = "src/pages/Dashboard.jsx"

js_code = '''import React, { useEffect, useState } from "react";
import { subscribeToAuthChanges } from "../authService";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase سیشن کا انتظار کریں
    const unsubscribe = subscribeToAuthChanges(({ user, profile, loading }) => {
      if (profile) {
        setUserData(profile);
      }
      setLoading(loading);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>لوڈ ہو رہا ہے...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>محترم {userData?.name || "صاحب"}!</h1>
      <p>والٹ: Rs. {userData?.wallet || 0}</p>
      <p>شہر: {userData?.city}</p>
      <p>موبائل: {userData?.phone}</p>
    </div>
  );
}
'''

os.makedirs(os.path.dirname(file_path), exist_ok=True)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(js_code)

print(f"✓ {file_path} میں کوڈ کامیابی سے محفوظ ہو گیا ہے!")
