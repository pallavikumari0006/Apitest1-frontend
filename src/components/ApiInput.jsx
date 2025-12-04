import { useState } from "react"
import ResponseViewer from "./ResponseViewer"

export default function ApiInputForm() {
  const [url, setUrl] = useState("")
  const [method, setMethod] = useState("GET")
  const [headers, setHeaders] = useState([{ key: "", value: "" }])
  const [body, setBody] = useState("")
  const [responseData, setResponseData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const requestData = { url, method, headers, body }

    try {
      const res = await fetch("http://localhost:5000/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })
      const data = await res.json()
      setResponseData(data)
    } catch (err) {
      setResponseData({ error: err.message })
    }
  }

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Center Form */}
      <main className="col-span-7 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com"
            className="w-full border rounded p-2"
          />

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>

          {/* Headers Editor */}
          <div>
            <label className="block text-sm font-medium">Headers</label>
            {headers.map((h, i) => (
              <div key={i} className="flex space-x-2 mt-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={h.key}
                  onChange={(e) => {
                    const newHeaders = [...headers]
                    newHeaders[i].key = e.target.value
                    setHeaders(newHeaders)
                  }}
                  className="flex-1 border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={h.value}
                  onChange={(e) => {
                    const newHeaders = [...headers]
                    newHeaders[i].value = e.target.value
                    setHeaders(newHeaders)
                  }}
                  className="flex-1 border rounded p-2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setHeaders([...headers, { key: "", value: "" }])}
              className="text-xs text-indigo-600 hover:underline mt-2"
            >
              + Add Header
            </button>
          </div>

          <textarea
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='{"key":"value"}'
            className="w-full border rounded p-2 font-mono"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Send
          </button>
        </form>
      </main>

      {/* Right Response Viewer */}
      <aside className="col-span-5 bg-gray-100 p-6 overflow-y-auto">
        <ResponseViewer response={responseData} />
      </aside>
    </div>
  )
}
import { saveHistory } from "../utils/api"

const handleSubmit = async (e) => {
  e.preventDefault()
  const requestData = { url, method, headers, body }

  try {
    const res = await fetch("http://localhost:5000/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
    const data = await res.json()
    setResponseData(data)

    // Save request to Supabase
    await saveHistory({
      user_id: user?.id, // from Supabase Auth
      url,
      method,
      body: body ? JSON.parse(body) : null,
      headers,
    })
  } catch (err) {
    setResponseData({ error: err.message })
  }
}
import { useEffect } from "react"

export default function ApiInputForm({ historyItem }) {
  const [url, setUrl] = useState("")
  const [method, setMethod] = useState("GET")
  const [headers, setHeaders] = useState([{ key: "", value: "" }])
  const [body, setBody] = useState("")

  useEffect(() => {
    if (historyItem) {
      setUrl(historyItem.url)
      setMethod(historyItem.method)
      setBody(JSON.stringify(historyItem.body, null, 2))
      setHeaders(historyItem.headers || [])
    }
  }, [historyItem])

  // ... rest of form
}
