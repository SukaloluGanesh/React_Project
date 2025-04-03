
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDhmfUmA0hTn50mctKIUMpObHA0UiqJyWM",
  authDomain: "scheduleme-86cb3.firebaseapp.com",
  projectId: "scheduleme-86cb3",
  storageBucket: "scheduleme-86cb3.firebasestorage.app",
  messagingSenderId: "913634306837",
  appId: "1:913634306837:web:8d5f322531601658b1971c",
  measurementId: "G-CMPC7L4N2S"
};


const app = initializeApp(firebaseConfig);

 const auth = getAuth(app)
 const provider = new GoogleAuthProvider();
 const db = getFirestore(app);
 const storage = getStorage(app);
 export { auth, db, storage, provider };