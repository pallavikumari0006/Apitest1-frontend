import { useState } from "react"

export default function CustomVarsForm({ customVars, setCustomVars }) {
  const [newKey, setNewKey] = useState("")

  function handleVarChange(key, value) {
    setCustomVars(prev => ({ ...prev, [key]: value }))
  }

  function addVar() {
    if (newKey.trim()) {
      setCustomVars(prev => ({ ...prev, [newKey]: "" }))
      setNewKey("")
    }
  }

  return (
    <div className="space-y-2">
      {Object.entries(customVars).map(([key, value]) => (
        <div key={key} className="flex gap-2">
          <input
            value={key}
            readOnly
            className="border p-2 w-1/3 bg-gray-100"
          />
          <input
            value={value}
            onChange={(e) => handleVarChange(key, e.target.value)}
            className="border p-2 w-2/3"
          />
        </div>
      ))}
      <div className="flex gap-2">
        <input
          placeholder="New variable key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="border p-2 w-2/3"
        />
        <button
          type="button"
          onClick={addVar}
          className="px-3 py-2 bg-indigo-600 text-white rounded"
        >
          + Add
        </button>
      </div>
    </div>
  )
}
