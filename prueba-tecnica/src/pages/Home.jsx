import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CharacterCard from "../components/CharaterCard"; // Asegúrate de usar el nombre correcto
import bannerImage from "../assets/todos.webp";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializar el hook de navegación

  // Verificar si el usuario está logueado, si no, redirigir al login
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      // Si no hay un usuario, redirigir al login
      navigate("/login");
    } else {
      fetchCharacters();
    }

    window.scrollTo({ top: 0, behavior: "smooth" }); // Subir al inicio de la página
  }, [currentPage, navigate]);

  const fetchCharacters = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${currentPage}`
      );
      setCharacters(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (err) {
      setError("Hubo un problema al cargar los personajes.");
      setCharacters([]);
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

  return (
    <div className="bg-gray-800 text-white pt-24 pb-20">
      {/* Banner con imagen de fondo */}
      <div
        className="relative bg-cover bg-center h-80 mb-8"
        style={{
          backgroundImage: `url(${bannerImage})`, // Usamos la imagen importada
        }}
      >
        {/* Filtro oscuro para mejorar el contraste del texto */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Texto encima de la imagen */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold text-white">
            Bienvenidos al Multiverso de Rick and Morty
          </h2>
          <p className="text-lg text-gray-300 mt-4">
            Descubre personajes increíbles y sus historias únicas.
          </p>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Personajes de Rick and Morty</h1>

        {loading && <p className="text-gray-500 text-center">Cargando...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid px-24 grid-cols-1 gap-10 md:grid-cols-2 md:px-16 lg:grid-cols-3">
          {/* Usamos CharacterCard para cada personaje */}
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
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
          <span className="text-lg">
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
    </div>
  );
}
