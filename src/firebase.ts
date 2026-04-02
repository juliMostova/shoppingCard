import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtjFn2ZWeoLUnn7xq4zHDGaOt2JMGIMMI",
  authDomain: "getorderinclient.firebaseapp.com",
  projectId: "getorderinclient",
  storageBucket: "getorderinclient.firebasestorage.app",
  messagingSenderId: "95258074706",
  appId: "1:95258074706:web:b5cae486582d6b59e0498b"
};


const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);