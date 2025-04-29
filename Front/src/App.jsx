import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Carrito from './pages/Carrito';
import Admin from "./pages/Admin";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/login" element ={<Login/>}/>
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}