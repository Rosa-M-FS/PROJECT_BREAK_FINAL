import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from "../context/CarritoContext";
import {useState} from 'react';

export default function Navbar() {
  const { carrito } = useCarrito();
  const [menuOpen,setMenuOpen]= useState(false);
  const navigate = useNavigate();

  
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const toggleMenu = ()=>{
    setMenuOpen(!menuOpen);
  }

  const handleLogout= () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  }

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>Tienda Artesanal</Link>
      <button className={styles.menuButton} onClick={toggleMenu}>
        ☰
      </button>
      <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        <Link to="/tienda" className={styles.link}>Productos</Link>
        <Link to="/carrito" className={styles.link}>
          Carrito {carrito.length > 0 && `(${carrito.length})`}</Link>
        <Link to="/wishlist" className={styles.link}>Wishlist</Link>
        { usuario?.rol === "admin" && (
        <Link to="/admin" className={styles.link}>Admin</Link>
        )}
        {usuario ? (
          <>
            <span className={styles.user}>Hola {usuario.nombre}</span>
            <button
              onClick={handleLogout}
              className={styles.link}
              style={{ background: "none", border: "none", cursor: "pointer" }}>
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link}>Entrar</Link>
            <Link to="/registro" className={styles.link}>Registrarse</Link>
          </>
        )}
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>Extras ▼</button>
          <div className={styles.dropdownContent}>
            <Link to="/cursos">Cursos</Link>
            <Link to="/materiales">Materiales</Link>
          </div>
        </div>

      </div>
    </nav>
  );
}

