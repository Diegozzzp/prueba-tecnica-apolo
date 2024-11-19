import { useState, useEffect } from "react";

export default function CreateEdit() {
  const [form, setForm] = useState({
    name: "",
    species: "",
    status: "",
    location: "",
    image: null,
    description: "",
  });
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Recuperar personajes guardados en localStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("characters")) || [];
    setItems(storedItems);
  }, []);

  // Guardar personajes en localStorage
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("characters", JSON.stringify(items));
    }
  }, [items]);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Manejo de la carga de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de datos
    if (!form.name || !form.species || !form.status || !form.location || !form.image || !form.description) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Añadir el nuevo personaje a la lista
    setItems([...items, form]);

    // Limpiar el formulario
    setForm({ name: "", species: "", status: "", location: "", image: null, description: "" });
    setError(""); // Limpiar error
    setIsFormVisible(false); // Ocultar el formulario después de enviar
  };

  return (
    <div className="p-8 pt-36 bg-gray-800">
      <button
        onClick={() => setIsFormVisible(true)}
        className="mb-4 p-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-all"
      >
        Crear Personaje
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg">
          {error && <p className="text-red-500">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="species"
            placeholder="Especie"
            value={form.species}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="status"
            placeholder="Estado"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="location"
            placeholder="Ubicación"
            value={form.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Guardar
          </button>
        </form>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Personajes Creados:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-xl">
              <div className="relative w-full h-64 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-white">{item.name}</h3>
              <p className="text-sm text-gray-400">{item.species} | {item.status}</p>
              <p className="text-sm text-gray-300 mt-2">{item.location}</p>
              <p className="text-sm text-gray-300 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
