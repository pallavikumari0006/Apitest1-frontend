export default function ResponseViewer({ response }) {
  if (!response) return <p>No response yet</p>
  return <pre>{JSON.stringify(response, null, 2)}</pre>
}
