import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC5zojjzKv080CAdPjbdTRqZdhjZQJZp6A",
  authDomain: "reactlinks-74dd9.firebaseapp.com",
  projectId: "reactlinks-74dd9",
  storageBucket: "reactlinks-74dd9.firebasestorage.app",
  messagingSenderId: "428840148732",
  appId: "1:428840148732:web:e93c96e27e12da8102c179"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export {auth, db};