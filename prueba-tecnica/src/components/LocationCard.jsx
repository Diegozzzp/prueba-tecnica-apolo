import { motion } from "framer-motion";

export default function LocationCard({ location, onToggleDetails, showDetails }) {
  return (
    <motion.div
      className="p-8 bg-gradient-to-r from-green-800 to-blue-700 rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <h2 className="text-2xl font-bold text-white">{location.name}</h2>
      <p className="text-yellow-300 font-semibold mt-2">
        Tipo: {location.type}
      </p>
      <p className="text-purple-300">Dimensión: {location.dimension}</p>
      <p className="text-blue-200">Habitantes: {location.residents.length}</p>

      <button
        onClick={() => onToggleDetails(location.id)}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-blue-400 transition-all duration-200"
      >
        {showDetails ? "Ocultar detalles" : "Ver detalles"}
      </button>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mt-4 p-6 bg-gray-800 rounded-lg text-gray-200"
        >
          <p className="text-green-300">
            <strong>Primera aparición:</strong> {location.created}
          </p>
          <p className="text-red-300">¡Más detalles pronto!</p>
        </motion.div>
      )}
    </motion.div>
  );
}
