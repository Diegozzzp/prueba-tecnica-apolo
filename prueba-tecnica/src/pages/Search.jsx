import { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "../components/CharaterCard";
import LocationCard from "../components/LocationCard";
import EpisodeCard from "../components/EpisodeCard";

export default function AdvancedSearch() {
  const [searchType, setSearchType] = useState("character"); // Tipo de búsqueda
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [filters, setFilters] = useState({ status: "", gender: "" }); // Filtros dinámicos
  const [results, setResults] = useState([]); // Resultados
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(""); // Mensaje de error
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas

  // Efecto para buscar automáticamente al cambiar parámetros
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchResults();
    }, 500); // Debounce de búsqueda
    return () => clearTimeout(timeout);
  }, [searchTerm, searchType, currentPage, filters]);

  // Función para obtener resultados de la API
  const fetchResults = async () => {
    setLoading(true);
    setError("");
    try {
      let url = `https://rickandmortyapi.com/api/${searchType}/?page=${currentPage}`;
      if (searchTerm) url += `&name=${searchTerm}`;
      if (searchType === "character") {
        if (filters.status) url += `&status=${filters.status}`;
        if (filters.gender) url += `&gender=${filters.gender}`;
      }

      const response = await axios.get(url);
      setResults(response.data.results || []);
      setTotalPages(response.data.info.pages || 0);
    } catch (err) {
      setError("No se encontraron resultados.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambio de filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Controles de paginación
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="p-10 bg-gray-800 text-white min-h-screen pt-36">
      <h1 className="text-3xl font-bold mb-6 text-center">Búsqueda Avanzada</h1>

      {/* Tipo de búsqueda */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
  <select
    value={searchType}
    onChange={(e) => {
      setSearchType(e.target.value);
      setSearchTerm("");
      setResults([]);
      setFilters({ status: "", gender: "" }); // Reiniciar filtros
    }}
    className="p-3 bg-gray-800 text-white rounded-md shadow-md border-b-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
  >
    <option value="character">🔍 Personajes</option>
    <option value="location">📍 Ubicaciones</option>
    <option value="episode">🎥 Episodios</option>
  </select>
</div>

{/* Campo de búsqueda */}
<div className="flex justify-center mb-8">
  <div className="relative w-full sm:w-2/3">
    <input
      type="text"
      placeholder={`Buscar ${
        searchType === "character"
          ? "personajes"
          : searchType === "location"
          ? "ubicaciones"
          : "episodios"
      }...`}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-3 bg-transparent text-white border-b-2 border-blue-500 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-300"
    />
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 16l-4-4m0 0l4-4m-4 4h16"
        />
      </svg>
    </div>
  </div>
</div>

{/* Filtros específicos para personajes */}
{searchType === "character" && (
  <div className="flex flex-wrap justify-center gap-4 mb-6">
    <select
      name="status"
      value={filters.status}
      onChange={handleFilterChange}
      className="p-3 bg-gray-800 text-white rounded-md shadow-md border-b-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
    >
      <option value="">🎯 Estado</option>
      <option value="alive">🟢 Vivo</option>
      <option value="dead">🔴 Muerto</option>
      <option value="unknown">⚪ Desconocido</option>
    </select>

    <select
      name="gender"
      value={filters.gender}
      onChange={handleFilterChange}
      className="p-3 bg-gray-800 text-white rounded-md shadow-md border-b-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300"
    >
      <option value="">🔻 Género</option>
      <option value="male">👨 Masculino</option>
      <option value="female">👩 Femenino</option>
      <option value="genderless">⚪ Sin género</option>
      <option value="unknown">❓ Desconocido</option>
    </select>
  </div>
)}


      {/* Indicador de carga */}
      {loading && (
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {/* Mensaje de error */}
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      <div className="grid px-6 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {results.map((item) =>
    searchType === "character" ? (
      <CharacterCard key={item.id} character={item} />
    ) : searchType === "location" ? (
      <LocationCard
        key={item.id}
        location={item}
        onToggleDetails={() => {}} // Opcional, según cómo manejes los detalles
        showDetails={false}
      />
    ) : (
      <EpisodeCard key={item.id} episode={item} />
    )
  )}
</div>


      {/* Controles de paginación */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-6 py-3 rounded-full ${
            currentPage === 1 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-6 py-3 rounded-full ${
            currentPage === totalPages
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
