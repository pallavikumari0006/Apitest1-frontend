import ApiForm from "./components/ApiForm"

export default function App() {
  return (
    <div className="h-screen grid grid-cols-12">
      <main className="col-span-9 p-6">
        <ApiForm />
        <h1 className="text-4xl font-bold text-indigo-600 mt-6">
          Tailwind is working 🚀
        </h1>
      </main>
      <aside className="col-span-3 bg-gray-100 p-6">
        Sidebar
      </aside>
    </div>
  )
}