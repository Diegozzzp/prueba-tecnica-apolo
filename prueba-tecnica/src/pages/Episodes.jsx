import { useState, useEffect } from "react";
import axios from "axios";
import EpisodeCard from "../components/EpisodeCard";
import Banner from "../assets/episodes.webp";

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/episode?page=${currentPage}`
        );
        setEpisodes(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (err) {
        setError("Error al cargar los episodios");
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="bg-gray-900">
      {/* Banner */}
      <div
        className="relative bg-cover bg-center h-96 rounded-lg mb-8"
        style={{
          backgroundImage: `url(${Banner})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold text-white"></h2>
          <p className="text-2xl text-gray-300 mt-8 font-semibold">
            Cada lugar en el universo de Rick and Morty tiene su propia historia.
          </p>
        </div>
      </div>

      <div className="px-24 pt-10 pb-16">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Episodios de Rick and Morty
        </h1>

        {loading && <p className="text-white text-center">Cargando episodios...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Episodios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>

        {/* Paginación */}
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
          <span className="text-white">
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
    </div>
  );
}
