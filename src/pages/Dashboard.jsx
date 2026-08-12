import React, { useEffect, useState } from "react";
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
