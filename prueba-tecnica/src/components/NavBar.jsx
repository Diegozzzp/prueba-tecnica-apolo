import { Link, useNavigate } from "react-router-dom"; // Usamos Link para las rutas de React Router
import Logo from "../assets/ricky.png"; // Asegúrate de tener el logo correctamente importado
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa"; // Usamos iconos para logout y login

export default function Navbar() {
  const navigate = useNavigate(); // Para redirigir al usuario a otras páginas

  // Función de logout
  const handleLogout = () => {
    // Elimina la información del usuario del localStorage
    localStorage.removeItem("currentUser"); // O el nombre de la clave donde guardas la sesión
    // Redirige a la página de login
    navigate("/login");
  };

  // Verifica si el usuario está autenticado
  const isAuthenticated = localStorage.getItem("currentUser"); // Esto depende de cómo guardas la sesión

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-800 text-white py-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo que lleva al Home */}
        <Link to="/home" className="cursor-pointer flex items-center">
          <img src={Logo} alt="Logo" className="w-16 h-16 mr-2" />
          <h1 className="text-xl font-bold">Ricky and Morty</h1>
        </Link>

        {/* Menú de navegación centrado */}
        <div className="flex-grow flex justify-center space-x-12">
          <Link to="/search" className="text-white hover:text-blue-400">Busqueda</Link>
          <Link to="/locations" className="text-white hover:text-blue-400">Ubicaciones</Link>
          <Link to="/episodes" className="text-white hover:text-blue-400">Episodios</Link>
          <Link to="/create" className="text-white hover:text-blue-400">Crear</Link>
        </div>

        {/* Botón de Logout o Login, alineado a la derecha */}
        <div className="flex items-center ml-auto space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-white font-bold animate-bounce">Bienvenido!</span> {/* Mostrar mensaje de bienvenida */}
              <button
                onClick={handleLogout}
                className="flex items-center text-white hover:text-blue-400"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center text-white hover:text-blue-400">
              <FaUserAlt className="mr-2" /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
