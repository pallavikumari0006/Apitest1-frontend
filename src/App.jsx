import { useState } from "react";
import ApiForm from "./components/ApiForm";
import PokemonForm from "./components/PokemonForm";

export default function App() {
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = async (name) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pokemon/${name}`);
      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      console.error(err);
      setPokemon(null);
    }
  };

  return (
    <div className="h-screen grid grid-cols-12">
      <main className="col-span-9 p-6 space-y-6">
        <ApiForm />
        <h1 className="text-4xl font-bold text-indigo-600">Tailwind is working 🚀</h1>

        <h2 className="text-2xl font-bold text-indigo-600">Pokémon API Tester</h2>
        <PokemonForm onSearch={fetchPokemon} />
        {pokemon && (
          <div className="mt-6 p-4 bg-white dark:bg-gray-900 rounded shadow">
            <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-32 h-32"
            />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Base Experience: {pokemon.base_experience}</p>
          </div>
        )}
      </main>
      <aside className="col-span-3 bg-gray-100 p-6">
        Sidebar
      </aside>
    </div>
  );
}
