import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true); // Alternar entre login y registro
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Verificar si el usuario ya está logueado
  const checkIfLoggedIn = () => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/home"); // Redirigir si ya hay un usuario logueado
    }
  };

  // Validaciones del formulario
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Todos los campos son obligatorios.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Correo no válido.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
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
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/home");
    } else {
      setError("Credenciales incorrectas.");
    }
  };

  // Manejar Registro
  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === formData.email)) {
      setError("El usuario ya está registrado.");
      return;
    }
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    setError("");
    setIsLogin(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  // Verificar si ya está logueado al montar el componente
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-4">
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="ejemplo@correo.com"
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
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="********"
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
              setIsLogin(!isLogin);
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
