// src/utils/errorHandler.js
export function getErrorMessage(err) {
  if (!err) return "Unknown error"
  if (typeof err === "string") return err
  if (err.message?.includes("Failed to fetch")) {
    return "Network/CORS error: Could not reach server."
  }
  if (err.name === "SyntaxError") {
    return "Invalid JSON in response."
  }
  return "Unexpected error: " + err.message
}
