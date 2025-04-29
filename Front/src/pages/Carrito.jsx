import { useCarrito } from "../context/CarritoContext";
import { useState } from "react";
import styles from "./Carrito.module.css";

export default function Carrito() {
    const { carrito, removeFromCarrito, clearCarrito } = useCarrito();
    const [compraRealizada, setCompraRealizada] = useState(false);
  
    const total = carrito.reduce((sum, item) =>
      sum + (item.precio || 0) * item.cantidad, 0);
  
    if (compraRealizada) {
      return (
        <div className={styles.carritoContainer}>
          <h2>¡Compra realizada con éxito!</h2>
          <p>Gracias por tu pedido. Recibirás un email de confirmación.</p>
        </div>
      );
    }
  
    if (carrito.length === 0) {
      return (
        <div className={styles.carritoContainer}>
          <h2>Tu carrito está vacío</h2>
        </div>
      );
    }
  
    return (
      <div className={styles.carritoContainer}>
        <h2>Carrito</h2>
        <ul className={styles.lista}>
          {carrito.map(item => (
            <li key={item._id} className={styles.item}>
              <div>
                <strong>{item.nombre}</strong> <br />
                <span>{item.precio.toFixed(2)} €</span> <br />
                <span>Cantidad: {item.cantidad}</span>
              </div>
              <button
                className={styles.quitar}
                onClick={() => removeFromCarrito(item._id)}
              >
                Quitar uno
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.total}>
          <b>Total: {total.toFixed(2)} €</b>
        </div>
        <button className={styles.vaciar} onClick={clearCarrito}>Vaciar carrito</button>
        <button
          className={styles.comprar}
          onClick={() => {
            setCompraRealizada(true);
            clearCarrito();
          }}
          style={{ marginLeft: "1rem" }}
        >
          Finalizar compra
        </button>
      </div>
    );
  }