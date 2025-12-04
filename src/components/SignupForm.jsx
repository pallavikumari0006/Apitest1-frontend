// src/components/SignupForm.jsx
import { useState } from "react"
import { signup } from "../utils/auth"

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await signup(email, password)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full" />
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="border p-2 w-full" />
      <button className="bg-indigo-600 text-white px-4 py-2 rounded">Sign up</button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  )
}
