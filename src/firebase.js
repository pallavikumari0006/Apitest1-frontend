// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDN3-dXFj-fzLEvTRQ4XiafpwDyMKIvEXw",
  authDomain: "clone-3b037.firebaseapp.com",
  projectId: "clone-3b037",
  storageBucket: "clone-3b037.firebasestorage.app",
  messagingSenderId: "560548187741",
  appId: "1:560548187741:web:5bc45f9bf920558c5f07b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);


// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDN3-dXFj-fzLEvTRQ4XiafpwDyMKIvEXw",
//   authDomain: "clone-3b037.firebaseapp.com",
//   projectId: "clone-3b037",
//   storageBucket: "clone-3b037.firebasestorage.app",
//   messagingSenderId: "560548187741",
//   appId: "1:560548187741:web:5bc45f9bf920558c5f07b4"
// };

// Initialize Firebase
//const app = initializeApp(firebaseConfig);