// src/utils/auth.js
import { auth } from "./firebaseClient"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

export async function signup(email, password) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  return user
}

export async function login(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return user
}

export async function logout() {
  await signOut(auth)
}
