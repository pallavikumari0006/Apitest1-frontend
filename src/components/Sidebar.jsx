import { useEffect, useState } from "react"
import { fetchHistory } from "../utils/api"

export default function Sidebar({ user, onSelectHistory }) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    async function load() {
      if (user) {
        const data = await fetchHistory(user.uid)
        setHistory(data)
      }
    }
    load()
  }, [user])

  return (
    <aside className="col-span-2 bg-white border-r p-4">
      <h2 className="text-lg font-semibold mb-4">History</h2>
      <ul className="space-y-2">
        {history.map((item) => (
          <li
            key={item.id}
            onClick={() => onSelectHistory(item)}
            className="cursor-pointer text-sm text-gray-700 hover:text-indigo-600"
          >
            {item.method} {item.url}
          </li>
        ))}
      </ul>
    </aside>
  )
}
