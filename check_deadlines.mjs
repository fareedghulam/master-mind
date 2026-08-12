import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx59hRoNxWI7a4iQtIaPKftFW1EMmfc",
  authDomain: "master-mind-qureshi-enterprise.firebaseapp.com",
  projectId: "master-mind-qureshi-enterprise",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const snap = await getDocs(collection(db,"deadlines"));

snap.forEach(doc => {
 console.log(doc.id, doc.data());
});
