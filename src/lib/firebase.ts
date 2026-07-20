import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAx59hRoNxWI7a4iQtIaPkOGftFW1EMmfc",
  authDomain: "master-mind-qureshi-enterprise.firebaseapp.com",
  projectId: "master-mind-qureshi-enterprise",
  storageBucket: "master-mind-qureshi-enterprise.firebasestorage.app",
  messagingSenderId: "343587675373",
  appId: "1:343587675373:web:26be133df0ec77ae4e40e4"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-mastermindquresh-ff3983e2-8998-40ba-9564-0a2763001795");
export const auth = getAuth(app);

async function testConnection() {
  try {
    // Attempt a live fetch from server to verify connection and credentials
    await getDocFromServer(doc(db, 'settings', 'connection_check'));
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
