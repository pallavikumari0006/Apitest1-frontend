// src/components/DarkModeToggle.jsx
import { useEffect, useState } from "react"

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  )
}
