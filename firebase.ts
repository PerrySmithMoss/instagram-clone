// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKKAC_MsLvHxYVimUK5EIOAXLFCazhQ1c",
  authDomain: "instagram-7dced.firebaseapp.com",
  projectId: "instagram-7dced",
  storageBucket: "instagram-7dced.appspot.com",
  messagingSenderId: "669560777571",
  appId: "1:669560777571:web:15c227f38453d745b10156",
  measurementId: "G-073DXN8TTJ",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
