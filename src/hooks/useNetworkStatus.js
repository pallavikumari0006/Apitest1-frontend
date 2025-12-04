// src/hooks/useNetworkStatus.js
import { useEffect, useState } from "react"

export default function useNetworkStatus() {
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    function updateStatus() {
      setOnline(navigator.onLine)
    }
    window.addEventListener("offline", updateStatus)
    window.addEventListener("online", updateStatus)
    return () => {
      window.removeEventListener("offline", updateStatus)
      window.removeEventListener("online", updateStatus)
    }
  }, [])

  return online
}
