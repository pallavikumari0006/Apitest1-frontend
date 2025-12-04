import { useState } from "react"
import { environments } from "../utils/envs"

export default function EnvSelector({ onChange }) {
  const [env, setEnv] = useState("dev")

  const handleChange = (e) => {
    const selected = e.target.value
    setEnv(selected)
    onChange(environments[selected]) // pass env config back to parent
  }

  return (
    <select
      value={env}
      onChange={handleChange}
      className="border p-2 rounded"
    >
      <option value="dev">Development</option>
      <option value="staging">Staging</option>
      <option value="production">Production</option>
    </select>
  )
}
