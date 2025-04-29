import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from "../context/CarritoContext";

export default function Navbar() {
  const { carrito } = useCarrito();
  const navigate = useNavigate();

  
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  {usuario && usuario.rol === "admin" && (
    <Link to="/admin" className={styles.link}>Admin</Link>
  )}
  
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  }

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>Tienda Artesanal</Link>
      <div>
        <Link to="/tienda" className={styles.link}>Tienda</Link>
        <Link to="/carrito" className={styles.link}>
          Carrito {carrito.length > 0 && `(${carrito.length})`}
        </Link>

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


      </div>
    </nav>
  );
}

