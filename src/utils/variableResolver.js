// src/utils/variableResolver.js
export function resolveVariables(str, envVars, customVars) {
  const allVars = { ...envVars, ...customVars }
  return str.replace(/{{(.*?)}}/g, (_, key) => allVars[key] || "")
}
