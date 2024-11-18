import { Link } from "react-router-dom"; // Usamos Link para las rutas de React Router
import Logo from "../assets/ricky.png"; // Asegúrate de tener el logo correctamente importado

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-800 text-white py-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo que lleva al Home */}
        <Link to="/home" className="cursor-pointer flex items-center">
          <img src={Logo} alt="Logo" className="w-16 h-16 mr-2" />
          <h1 className="text-xl font-bold">Ricky and Morty</h1>
        </Link>

        {/* Menú de navegación */}
        <div className="space-x-4 flex items-center">
          <Link to="/search" className="text-white hover:text-blue-400">Busqueda</Link>
          <Link to="/create" className="text-white hover:text-blue-400">Crear</Link>
          <Link to="/locations" className="text-white hover:text-blue-400">Ubicaiciones</Link>
          <Link to="/episodes" className="text-white hover:text-blue-400">Episodios</Link>
        </div>
      </div>
    </nav>
  );
}
