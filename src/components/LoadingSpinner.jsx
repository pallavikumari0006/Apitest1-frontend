// src/components/LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div className="flex items-center gap-2 text-indigo-600">
      <svg
        className="animate-spin h-5 w-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
      </svg>
      <span>Loading...</span>
    </div>
  )
}
