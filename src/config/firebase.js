// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx52r3QX2Q7A0f6EZGoSPfWBIp2g-a9AY",
  authDomain: "secrefiy.firebaseapp.com",
  projectId: "secrefiy",
  storageBucket: "secrefiy.appspot.com",
  messagingSenderId: "153316401548",
  appId: "1:153316401548:web:2b6c5d3b3965a94750b6a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
