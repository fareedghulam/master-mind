import { onAuthStateChanged } from "firebase/auth";
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
