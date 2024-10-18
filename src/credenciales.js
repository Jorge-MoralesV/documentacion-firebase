// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2iash2QvWclva0EdJ9yUbp7vB4klbgwk",
  authDomain: "documentos-tec-e4208.firebaseapp.com",
  projectId: "documentos-tec-e4208",
  storageBucket: "documentos-tec-e4208.appspot.com",
  messagingSenderId: "42573744103",
  appId: "1:42573744103:web:a7345e5b854f47b7911f42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);