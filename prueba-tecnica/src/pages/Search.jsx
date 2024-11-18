import { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "../components/CharaterCard"; // Asegúrate de importar correctamente el componente

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Manejar el término de búsqueda con un debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm) {
        fetchResults();
      } else {
        setResults([]); // Limpia los resultados si no hay búsqueda
        setError("");
      }
    }, 500); // Espera 500ms antes de enviar la solicitud

    return () => clearTimeout(timeout); // Limpia el temporizador anterior si el usuario sigue escribiendo
  }, [searchTerm]);

  const fetchResults = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${searchTerm}`
      );
      if (response.data.results) {
        setResults(response.data.results);
      } else {
        setResults([]);
      }
    } catch (err) {
      setError("No se encontraron personajes con ese nombre.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-28 min-h-screen bg-gray-800 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Buscar Personajes</h1>

      {/* Campo de búsqueda */}
      <div className="mb-6 flex justify-center ">
        <input
          type="text"
          placeholder="Escribe para buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-3 border-2 border-blue-500 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        />
      </div>

      {/* Indicador de carga */}
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {/* Mensaje de error si no se encuentran personajes */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Resultados de búsqueda */}
      <div className="grid px-20 grid-cols-1 gap-6 md:grid-cols-2 md:px-0 lg:grid-cols-3 lg:px-16">
        {results.length === 0 && !loading && !error && (
          <p className="text-gray-500 text-center">No se encontraron resultados.</p>
        )}

        {results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
