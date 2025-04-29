import { useEffect, useState } from "react";
import { getPedidos } from "../services/api";
import styles from "./AdminPedidos.module.css";

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/pedidos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setPedidos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  if (loading) return <p>Cargando pedidos...</p>;

  return (
    <div className={styles.pedidosContainer}>
      <h2>Pedidos recibidos</h2>
      <ul className={styles.lista}>
        {pedidos.map(pedido => (
          <li key={pedido._id} className={styles.pedidoItem}>
            <p><b>Cliente:</b> {pedido.usuario?.nombre || "No disponible"}</p>
            <p><b>Fecha:</b> {new Date(pedido.fecha).toLocaleDateString()}</p>
            <p><b>Total:</b> {pedido.total.toFixed(2)} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
