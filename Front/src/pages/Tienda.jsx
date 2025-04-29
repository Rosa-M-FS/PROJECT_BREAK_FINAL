import { useEffect, useState } from "react";
import { getProductos } from "../services/api";
import {Link} from "react-router-dom"
import styles from "./Tienda.module.css";
import ProductCard from "../components/ProductCard";

export default function Tienda() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProductos()
      .then(setProductos)
      .catch(() => setError("No se pudieron cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.tienda}>
      <h2>Productos disponibles</h2>
      <div className={styles.productosGrid}>
        {productos.map(producto => (
        <ProductCard key={producto._id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

