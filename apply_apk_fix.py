#!/usr/bin/env python3
"""
Master Mind Qureshi Enterprise - APK Profile Loading Fix
Run this from inside the project root (the folder that contains src/, android/, package.json).
Usage: python3 apply_apk_fix.py
"""
import os
import sys

def patch_file(path, replacements, label):
    if not os.path.exists(path):
        print(f"[FAIL] {label}: file not found at {path}")
        return False
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    original = content
    for i, (old, new) in enumerate(replacements, 1):
        if old not in content:
            print(f"[FAIL] {label}: anchor #{i} not found. File may already be patched, "
                  f"or its content differs from what this script expects.")
            print(f"       Aborting changes to {path} (no partial writes).")
            return False
        content = content.replace(old, new, 1)

    if content == original:
        print(f"[SKIP] {label}: nothing changed.")
        return True

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[OK] {label}: patched successfully -> {path}")
    return True


def main():
    root = os.getcwd()
    store_path = os.path.join(root, "src", "utils", "store.ts")
    app_path = os.path.join(root, "src", "App.tsx")
    firebase_path = os.path.join(root, "src", "lib", "firebase.ts")

    # ---------- store.ts : Edit 1 - onAuthStateChanged now calls ensureUserProfile ----------
    store_edit1_old = """  // A. Listen to Auth State dynamically
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const email = firebaseUser.email;
      const uid = firebaseUser.uid;
      if (email) {
        const normalized = email.toLowerCase().trim();
        // Look up user role dynamically
        let userProfile = cachedUsers.find(u => u.uid === uid);
        if (!userProfile) {
          try {
            const docRef = doc(db, 'users', uid);
            const userDoc = await getDocFromServer(docRef);
            if (userDoc.exists()) {
              userProfile = userDoc.data() as User;
            }
          } catch (e) {
            console.error("Failed to fetch user role on auth state change:", e);
          }
        }
        
        const isSuper = userProfile && (userProfile.role === 'superAdmin' || userProfile.role === 'admin');
        const isDataEntry = userProfile && userProfile.role === 'dataEntryAdmin';
        
        if (isSuper || isDataEntry) {
          sessionStorage.setItem('admin_verified', 'true');
        }
      }
    } else {
      sessionStorage.removeItem('admin_verified');
    }
    notifyListeners();
  });"""

    store_edit1_new = """  // A. Listen to Auth State dynamically
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const email = firebaseUser.email;
      const uid = firebaseUser.uid;
      if (email) {
        // [FIX] Resolve the profile (uid doc, or migrate from legacy email
        // doc) on EVERY auth state change - not only inside the explicit
        // login button handler. This is what makes automatic session
        // restore (which is exactly what happens on Android/Capacitor
        // when the app is reopened while already logged in) actually
        // find the real profile instead of silently falling back to a
        // placeholder.
        const userProfile = await ensureUserProfile(uid, email);

        const isSuper = userProfile && (userProfile.role === 'superAdmin' || userProfile.role === 'admin');
        const isDataEntry = userProfile && userProfile.role === 'dataEntryAdmin';
        
        if (isSuper || isDataEntry) {
          sessionStorage.setItem('admin_verified', 'true');
        }
      }
    } else {
      sessionStorage.removeItem('admin_verified');
    }
    notifyListeners();
  });"""

    # ---------- store.ts : Edit 2 - insert ensureUserProfile() before initializeStore ----------
    store_edit2_old = "export function initializeStore() {"

    store_edit2_new = """// Tracks whether we are actively resolving the current user's profile from
// Firestore, so the UI can show a real "loading" state instead of treating
// a placeholder object as the final answer.
let profileResolving = false;
export function isProfileResolving(): boolean {
  return profileResolving;
}

// [FIX] Single source of truth for turning a signed-in Firebase Auth user
// (uid + email) into a Firestore profile. Looks up users/{uid} first; if
// missing, falls back to the legacy users/{email} doc and migrates it to
// users/{uid}. Updates cachedUsers so getLoggedInUser()/getUsers() see the
// result immediately. This used to live only inside the interactive
// handleLogin() flow in App.tsx, which meant it never ran again once a
// session was auto-restored (e.g. reopening the Android app while still
// logged in) - that gap is what caused the profile to stay stuck on the
// placeholder ("Loading...", balance 0) on Android while working fine in
// the browser (where the user was going through the explicit login form).
export async function ensureUserProfile(uid: string, email: string): Promise<User | null> {
  const existing = cachedUsers.find(u => u.uid === uid);
  if (existing) return existing;

  profileResolving = true;
  notifyListeners();

  try {
    const uidDocRef = doc(db, 'users', uid);
    const uidDoc = await getDocFromServer(uidDocRef);

    let profile: User | null = null;

    if (uidDoc.exists()) {
      profile = { ...(uidDoc.data() as User), uid };
    } else {
      // Legacy doc keyed by email instead of uid - migrate it.
      const emailLower = email.toLowerCase().trim();
      const legacyDocRef = doc(db, 'users', emailLower);
      try {
        const legacyDoc = await getDocFromServer(legacyDocRef);
        if (legacyDoc.exists()) {
          profile = { ...(legacyDoc.data() as User), uid };
          await setDoc(uidDocRef, profile);
          await deleteDoc(legacyDocRef);
          console.log(`[UID-Migration] Auto-migrated ${emailLower} to users/{uid} on session restore.`);
        }
      } catch (legacyErr) {
        console.error('[ensureUserProfile] Legacy doc lookup failed:', legacyErr);
      }
    }

    if (profile) {
      const isSuper = profile.role === 'superAdmin' || profile.role === 'admin';
      const isDataEntry = profile.role === 'dataEntryAdmin';
      profile.isAdmin = isSuper || isDataEntry || profile.isAdmin || false;
      profile.role = isSuper ? 'superAdmin' : (isDataEntry ? 'dataEntryAdmin' : (profile.role || 'customer'));

      cachedUsers = [...cachedUsers.filter(u => u.uid !== uid), profile];
      return profile;
    }

    console.error(`[ensureUserProfile] No profile found for uid=${uid} email=${email} in users/{uid} or users/{email}.`);
    return null;
  } catch (err) {
    console.error('[ensureUserProfile] Failed to resolve profile:', err);
    return null;
  } finally {
    profileResolving = false;
    notifyListeners();
  }
}

export function initializeStore() {"""

    # ---------- store.ts : Edit 3 - add error handler to users collection onSnapshot ----------
    store_edit3_old = """      cachedUsers = Array.from(emailMap.values());
      notifyListeners();
    }
  });"""

    store_edit3_new = """      cachedUsers = Array.from(emailMap.values());
      notifyListeners();
    }
  }, (error) => {
    // [FIX] Previously there was no error callback here at all, so any
    // failure (permission-denied, offline, etc.) was completely silent -
    // cachedUsers would just stay empty forever with no diagnostic trace.
    console.error('[initializeStore] users collection listener failed:', error.code, error.message);
  });"""

    store_ok = patch_file(
        store_path,
        [
            (store_edit1_old, store_edit1_new),
            (store_edit2_old, store_edit2_new),
            (store_edit3_old, store_edit3_new),
        ],
        "src/utils/store.ts",
    )

    # ---------- App.tsx : remove fixed 500ms race + add safety-timeout cleanup ----------
    app_edit1_old = """    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      console.log("Firebase Auth State:", user?.email || "No User");

      try {
        syncWithStore();

        await new Promise(resolve => setTimeout(resolve, 500));

        syncWithStore();
      } catch (error) {
        console.error("Auth loading error:", error);
      } finally {
        setAuthLoading(false);
      }
    });

    // Safety timeout: if Firebase does not respond
    setTimeout(() => {
      setAuthLoading(false);
    }, 8000);"""

    app_edit1_new = """    // [FIX] Removed the fixed 500ms timeout that used to run here. It was a
    // guess at how long the Firestore profile fetch takes, tuned for
    // browser/Wi-Fi conditions. On a slower Android connection (or a cold
    // WebView start) the real fetch can easily take longer, so the app was
    // moving on with whatever placeholder data existed at the 500ms mark.
    // The actual profile resolution now happens in ensureUserProfile()
    // inside store.ts's own onAuthStateChanged listener, and every time it
    // finishes it calls notifyListeners() -> the subscribeToStore callback
    // above -> syncWithStore(), which updates currentUser with real data
    // whenever it becomes available, however long that takes.
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      console.log("Firebase Auth State:", user?.email || "No User");
      syncWithStore();
      setAuthLoading(false);
    });

    // Safety timeout: only as a last resort if Firebase never responds at all
    const safetyTimeout = setTimeout(() => {
      setAuthLoading(false);
    }, 8000);"""

    app_edit2_old = """    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, []);"""

    app_edit2_new = """    return () => {
      unsubscribe();
      unsubscribeAuth();
      clearTimeout(safetyTimeout);
    };
  }, []);"""

    app_ok = patch_file(
        app_path,
        [
            (app_edit1_old, app_edit1_new),
            (app_edit2_old, app_edit2_new),
        ],
        "src/App.tsx",
    )

    # ---------- lib/firebase.ts : add real setPersistence (the one that's actually used) ----------
    fb_edit1_old = """import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';"""

    fb_edit1_new = """import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';"""

    fb_edit2_old = """export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);"""

    fb_edit2_new = """export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// [FIX] This is the auth instance actually used everywhere in the app
// (App.tsx, store.ts, AdminPortal.tsx all import from this file).
// src/firebaseConfig.js also called setPersistence(), but that file is
// never imported anywhere, so it had zero effect at runtime. Setting it
// here makes the login session reliably persist across app restarts on
// Android/Capacitor.
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error('Auth persistence error:', err);
});"""

    fb_ok = patch_file(
        firebase_path,
        [
            (fb_edit1_old, fb_edit1_new),
            (fb_edit2_old, fb_edit2_new),
        ],
        "src/lib/firebase.ts",
    )

    print()
    if store_ok and app_ok and fb_ok:
        print("=== All 3 files patched successfully. ===")
        print("Next steps:")
        print("  npm run build")
        print("  npx cap sync android")
        print("  cd android && ./gradlew assembleDebug")
        sys.exit(0)
    else:
        print("=== Some files were NOT patched. Scroll up and check the [FAIL] lines. ===")
        sys.exit(1)


if __name__ == "__main__":
    main()
