// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Конфігурація Firebase для веб-додатку
const firebaseConfig = {
  apiKey: "AIzaSyA_W9CXb1E01j2-FKmXGfT4BsEL0qM_T30",
  authDomain: "soniachna-dolyna.firebaseapp.com",
  projectId: "soniachna-dolyna",
  storageBucket: "soniachna-dolyna.firebasestorage.app",
  messagingSenderId: "729529057701",
  appId: "1:729529057701:web:715cefbad8110dcaa8284c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
