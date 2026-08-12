import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx59hRoNxWI7a4iQtIaPKftFW1EMmfc",
  authDomain: "master-mind-qureshi-enterprise.firebaseapp.com",
  projectId: "master-mind-qureshi-enterprise",
  storageBucket: "master-mind-qureshi-enterprise.firebasestorage.app",
  messagingSenderId: "343587675373",
  appId: "1:343587675373:web:26be133df0ec77ae4e40e4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

await deleteDoc(doc(db, "deadlines", "pk-bond-100"));

console.log("✅ pk-bond-100 deleted");
