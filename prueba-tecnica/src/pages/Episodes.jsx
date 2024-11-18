import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode');
        setEpisodes(response.data.results);
      } catch (err) {
        setError('Error al cargar los episodios');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-900 mt-24">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Episodios de Rick and Morty</h1>
      
      {loading && <p className="text-white text-center">Cargando episodios...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((episode) => (
          <div key={episode.id} className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{episode.name}</h3>
            <p className="text-gray-400">Episodio: {episode.id}</p>
            <p className="text-gray-500">Fecha de emisión: {episode.air_date}</p>
            <p className="text-gray-300">Temporada: {episode.episode}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
