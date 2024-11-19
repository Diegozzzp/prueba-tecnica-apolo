import { useState, useEffect } from "react";
import axios from "axios";
import LocationCard from "./LocationCard";

export default function LocationList({ title, bannerImage }) {
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeDetails, setActiveDetails] = useState(null); // Controlar qué tarjeta muestra detalles

  useEffect(() => {
    fetchLocations();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const fetchLocations = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location?page=${currentPage}`
      );
      setLocations(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (err) {
      setError("Error al cargar las ubicaciones");
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const toggleDetails = (id) => {
    setActiveDetails(activeDetails === id ? null : id);
  };

  return (
    <div className="bg-gray-900 pb-8">
      {/* Banner */}
      <div
        className="relative bg-cover bg-center h-80 rounded-lg mb-8"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold text-white">{title}</h2>
          <p className="text-lg text-gray-300 mt-4">
            Cada lugar en el universo de Rick and Morty tiene su propia historia.
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center text-white mb-6">Ubicaciones</h1>

      {loading && <p className="text-white text-center">Cargando ubicaciones...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Lista de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            onToggleDetails={toggleDetails}
            showDetails={activeDetails === location.id}
          />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center items-center gap-8 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-6 py-3 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Anterior
        </button>
        <span className="text-lg text-white">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-6 py-3 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
