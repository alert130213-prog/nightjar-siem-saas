import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2VMB8y_-E3TAUKqLJBDp80a41I0aqwFU",
  authDomain: "nightjar-siem.firebaseapp.com",
  projectId: "nightjar-siem",
  storageBucket: "nightjar-siem.firebasestorage.app",
  messagingSenderId: "76062309459",
  appId: "1:76062309459:web:8715e06a2bac3ab5d35aa6",
  measurementId: "G-09LQDERMJZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
