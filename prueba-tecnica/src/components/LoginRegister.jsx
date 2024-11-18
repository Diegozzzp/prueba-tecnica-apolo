import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegación

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true); // Alternar entre login y registro
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Manejo de errores
  const navigate = useNavigate(); // Para redirigir al Home después del login exitoso

  // Validaciones simples
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Todos los campos son obligatorios.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Correo no válido.");
      return false;
    }
    return true;
  };

  // Manejar Login
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );
    if (user) {
      // Si el login es exitoso, redirigir al Home
      localStorage.setItem("currentUser", JSON.stringify(user)); // Guardamos al usuario logueado
      navigate("/home"); // Redirigir
      return;
    }
    setError("Credenciales incorrectas.");
  };

  // Manejar Registro
  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === formData.email)) {
      setError("El usuario ya está registrado.");
      return;
    }
    // Si no está registrado, lo agregamos
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users)); // Guardamos en localStorage
    setError(""); // Limpiar errores
    setIsLogin(true); // Cambiar a login
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      handleLogin(); // Si estamos en login
    } else {
      handleRegister(); // Si estamos en registro
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Iniciar Sesión" : "Registrar"}
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition"
          >
            {isLogin ? "Iniciar Sesión" : "Registrar"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p
            className="text-blue-400 cursor-pointer"
            onClick={() => {
              setIsLogin(!isLogin); // Alternar entre Login y Registro
              setError(""); // Limpiar errores
            }}
          >
            {isLogin
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia Sesión"}
          </p>
        </div>
      </div>
    </div>
  );
}
