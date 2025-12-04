// src/components/ApiForm.jsx
import { useState, useEffect } from "react"
import { saveHistory } from "../utils/api"
import ResponseViewer from "./ResponseViewer"
import EnvSelector from "./EnvSelector"
import CustomVarsForm from "./CustomVarsForm"
import LoadingSpinner from "./LoadingSpinner"
import ErrorMessage from "./ErrorMessage"
import { resolveVariables } from "../utils/variableResolver"
import { getErrorMessage } from "../utils/errorHandler"
import useNetworkStatus from "../hooks/useNetworkStatus"

export default function ApiForm({ user, onResponse, historyItem }) {
  const [envConfig, setEnvConfig] = useState({})
  const [customVars, setCustomVars] = useState({})
  const [url, setUrl] = useState("")
  const [method, setMethod] = useState("GET")
  const [headers, setHeaders] = useState("{}")
  const [body, setBody] = useState("{}")
  const [responseData, setResponseData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const online = useNetworkStatus()

  useEffect(() => {
    if (historyItem) {
      setUrl(historyItem.url || "")
      setMethod(historyItem.method || "GET")
      setHeaders(JSON.stringify(historyItem.headers || {}, null, 2))
      setBody(JSON.stringify(historyItem.body || {}, null, 2))
    }
  }, [historyItem])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!online) {
      setError("No internet connection. Please reconnect.")
      return
    }

    setLoading(true)
    setError(null)
    try {
      const finalUrl = resolveVariables(url, envConfig, customVars)
      const finalHeaders = JSON.parse(resolveVariables(headers, envConfig, customVars) || "{}")
      const finalBody = JSON.parse(resolveVariables(body, envConfig, customVars) || "{}")

      const res = await fetch("http://localhost:5000/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: finalUrl, method, headers: finalHeaders, body: finalBody }),
      })

      const data = await res.json()
      setResponseData({ status: res.status, data })
      if (onResponse) onResponse({ status: res.status, data })

      if (user) {
        await saveHistory({ user_id: user.uid, url: finalUrl, method, headers: finalHeaders, body: finalBody })
      }
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-12 h-screen">
      <main className="col-span-7 p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <EnvSelector onChange={setEnvConfig} />
          <CustomVarsForm customVars={customVars} setCustomVars={setCustomVars} />

          <input
            type="text"
            placeholder="Enter URL (use {{API_BASE}})"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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

          <textarea
            placeholder="Headers (JSON, use {{TOKEN}})"
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="w-full border rounded p-2 h-20 font-mono"
          />

          <textarea
            placeholder="Body (JSON, use {{TOKEN}})"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border rounded p-2 h-20 font-mono"
          />

          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Send Request
          </button>
        </form>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
      </main>

      <aside className="col-span-5 bg-gray-100 dark:bg-gray-800 p-6 overflow-y-auto">
        <div
          className={`transition-opacity duration-500 ${
            responseData ? "opacity-100" : "opacity-0"
          }`}
        >
          <ResponseViewer response={responseData} />
        </div>
      </aside>
    </div>
  )
}
