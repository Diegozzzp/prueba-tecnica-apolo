import React from 'react';

export default function EpisodeCard({ episode }) {
  return (
    <div className=" bg-gradient-to-r from-green-800 to-blue-700 text-white p-6 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
      <h3 className="text-xl font-bold">{episode.name}</h3>
      <p className="text-gray-400">Episodio: {episode.id}</p>
      <p className="text-gray-500">Fecha de emisión: {episode.air_date}</p>
      <p className="text-gray-300">Temporada: {episode.episode}</p>
    </div>
  );
}
