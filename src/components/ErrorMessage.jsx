// src/components/ErrorMessage.jsx
export default function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <p className="text-red-600 font-medium bg-red-50 border border-red-200 p-2 rounded">
      {message}
    </p>
  )
}
