// src/utils/api.js
import { db } from "./firebaseClient"
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore"

// --------------------
// Save request history
// --------------------
export async function saveHistory({ user_id, url, method, body, headers }) {
  try {
    await addDoc(collection(db, "history"), {
      user_id,
      url,
      method,
      body,
      headers,
      created_at: serverTimestamp(),
    })
    console.log("History saved!")
  } catch (err) {
    console.error("Error saving history:", err)
  }
}

// --------------------
// Fetch history for a user
// --------------------
export async function fetchHistory(user_id) {
  try {
    const q = query(
      collection(db, "history"),
      where("user_id", "==", user_id),
      orderBy("created_at", "desc")
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (err) {
    console.error("Error fetching history:", err)
    return []
  }
}

// --------------------
// Create a new collection (folder)
// --------------------
export async function createCollection(user_id, name) {
  try {
    const docRef = await addDoc(collection(db, "collections"), {
      user_id,
      name,
      created_at: serverTimestamp(),
    })
    console.log("Collection created with ID:", docRef.id)
    return { id: docRef.id, user_id, name }
  } catch (err) {
    console.error("Error creating collection:", err)
    return null
  }
}

// --------------------
// Fetch collections for a user
// --------------------
export async function fetchCollections(user_id) {
  try {
    const q = query(collection(db, "collections"), where("user_id", "==", user_id))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (err) {
    console.error("Error fetching collections:", err)
    return []
  }
}
