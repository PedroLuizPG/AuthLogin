import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAGJLr3oKxA6tRHFHKIQ1TI5f7UU8eKiYs",
    authDomain: "learningauth-f3227.firebaseapp.com",
    projectId: "learningauth-f3227",
    storageBucket: "learningauth-f3227.firebasestorage.app",
    messagingSenderId: "955752916704",
    appId: "1:955752916704:web:64e00fc58a3677d6f39285"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}