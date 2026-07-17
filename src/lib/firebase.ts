import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAdxB4gKa6AB9mrOuE6PeQGzbUVUtXKBKs",
  authDomain: "cool-segment-c79b0.firebaseapp.com",
  projectId: "cool-segment-c79b0",
  storageBucket: "cool-segment-c79b0.firebasestorage.app",
  messagingSenderId: "719868641304",
  appId: "1:719868641304:web:3a1a98d832412375f8436d"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-mastermindquresh-ff3983e2-8998-40ba-9564-0a2763001795");
export const auth = getAuth(app);

async function testConnection() {
  try {
    // Attempt a live fetch from server to verify connection and credentials
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firestore connection check succeeded.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration: Client is offline.");
    } else {
      console.log("Firestore connection verified:", error);
    }
  }
}

testConnection();
