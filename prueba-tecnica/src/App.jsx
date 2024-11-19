import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Create from "./pages/CreateEdit";
import Episodes from "./pages/Episodes";
import Locations from "./pages/Ubications";
import Login from "./components/LoginRegister";

function App() {
  const isAuthenticated = localStorage.getItem("currentUser"); // O el método que uses para verificar la autenticación

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirige a /login si no está autenticado */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </Router>
  );
}

export default App;
