import { useState } from "react";

export default function CreateEdit() {
  const [form, setForm] = useState({ name: "", status: "" });
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([...items, form]);
    setForm({ name: "", status: "" });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="status"
          placeholder="Estado"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Guardar
        </button>
      </form>
      <div className="mt-4">
        <h2 className="text-lg font-bold">Elementos Creados:</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="p-2 border-b">
              {item.name} - {item.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
