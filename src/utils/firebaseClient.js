// src/utils/firebaseClient.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Firebase config comes from your Firebase Console → Project Settings
// Store values in Vite environment variables (like you did for Supabase)
const firebaseConfig = {
   apiKey: "AIzaSyDN3-dXFj-fzLEvTRQ4XiafpwDyMKIvEXw",
   authDomain: "clone-3b037.firebaseapp.com",
   projectId: "clone-3b037",
   storageBucket: "clone-3b037.firebasestorage.app",
   messagingSenderId: "560548187741",
   appId: "1:560548187741:web:5bc45f9bf920558c5f07b4"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export services for use in your app
export const auth = getAuth(app)       // Firebase Authentication
export const db = getFirestore(app)    // Firestore Database
console.log("Firebase API Key:", "AIzaSyDN3-dXFj-fzLEvTRQ4XiafpwDyMKIvEXw")
console.log("Firebase initialized with project:", firebaseConfig.projectId)
// src/utils/firebaseClient.js

