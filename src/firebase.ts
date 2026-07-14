import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx59hRoNxWI7a4iQtIaPkOGftFW1EMmfc",
  authDomain: "master-mind-qureshi-enterprise.firebaseapp.com",
  projectId: "master-mind-qureshi-enterprise",
  storageBucket: "master-mind-qureshi-enterprise.firebasestorage.app",
  messagingSenderId: "343587675373",
  appId: "1:343587675373:web:26be133df0ec77ae4e40e4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
