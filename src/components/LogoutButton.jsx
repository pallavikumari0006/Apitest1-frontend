// src/components/LogoutButton.jsx
import { logout } from "../utils/auth"

export default function LogoutButton() {
  return (
    <button className="bg-gray-800 text-white px-3 py-2 rounded" onClick={logout}>
      Log out
    </button>
  )
}
