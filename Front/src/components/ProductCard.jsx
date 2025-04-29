import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

export default function ProductCard({ producto }) {
  return (
    <Link to={`/producto/${producto._id}`} className={styles.cardLink}>
      <div className={styles.productoCard}>
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <p>
          <b>
            {typeof producto.precio === "number"
              ? producto.precio.toFixed(2) + " €"
              : "Sin precio"}
          </b>
        </p>
      </div>
    </Link>
  );
}
