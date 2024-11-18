import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa'; // Usando react-icons para el ícono de detalles

export default function CharacterCard({ character }) {
  const [showDetails, setShowDetails] = useState(false);

  // Función para mostrar los detalles en un modal o popup
  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  // Determinar el color del estado
  const statusColor = character.status === "Dead" ? "text-red-500" : "text-green-500";

  return (
    <motion.div
      className="p-8 bg-gradient-to-r from-blue-900 to-purple-800 rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-56 object-cover rounded-xl"
      />
      <h2 className="text-2xl font-bold text-white mt-4">{character.name}</h2>
      {/* Aplicamos el color basado en el estado */}
      <p className={`text ${statusColor} font-semibold text-lg `}>Status: {character.status}</p>
      <p className="text-yellow-300">Species: {character.species}</p>

      <button
        onClick={handleDetailsClick}
        className="mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-green-400 transition-all duration-200"
      >
        <FaInfoCircle /> Detalles
      </button>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mt-4 p-8 bg-gray-800 rounded-lg text-gray-200 "
        >
          <p className='text-yellow-300 text-lg'><strong className='text-green-300'>Última ubicación:</strong> {character.location.name}</p>
          <p className='text'><strong className='text-lg'>Gender:</strong> {character.gender}</p>
          <p className="text-blue-300">More information soon...</p>
        </motion.div>
      )}
    </motion.div>
  );
}
