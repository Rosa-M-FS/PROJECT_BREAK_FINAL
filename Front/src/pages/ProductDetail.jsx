import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/api";
import styles from './ProductDetail';
import { useCarrito } from "../context/CarritoContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCarrito } = useCarrito();
  const usuario = localStorage.getItem("token");

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!producto) return <p>No se encontró el producto.</p>;
  

  return (
    <div className={styles.detalleContainer}>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p><b>        
        {typeof producto.precio === "number"
        ? producto.precio.toFixed(2) + " €"
        : "Sin precio"}
      </b></p>
      {usuario && (
        <button
          onClick={() => addToCarrito(producto)}
          className={styles.addCarrito}
        >
          Añadir al carrito
        </button>
      )}
      {!usuario && (
        <p style={{ color: "#a12727", marginTop: "1rem" }}>
          Inicia sesión para comprar
        </p>
      )}
    </div>
  );
}
