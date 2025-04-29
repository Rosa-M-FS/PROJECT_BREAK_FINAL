import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css"
import { useWishlist } from "../context/WishlistContext";
import { useCarrito } from "../context/CarritoContext";

export default function ProductCard({ producto }) {
  const { isInWishlist, addToWishlist,removeFromWishlist} = useWishlist();
  const { addToCarrito } = useCarrito();

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(producto._id)) {
      removeFromWishlist(producto._id);
    } else {
      addToWishlist(producto);
    }
  };

  return (
      <div className={styles.productoCard}>
        <Link to={`/producto/${producto._id}`} className={styles.cardLink}>
        <img src={`/images/${producto.imagenes[0]}`} alt={producto.nombre} className={styles.productImage} />
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <p>
          <b>{typeof producto.precio === "number"
              ? producto.precio.toFixed(2) + " €"
              : "Sin precio"}</b>
        </p>
        </Link>
        <button onClick={() => toggleWishlist(producto)}>
          {isInWishlist(producto._id) ? "❤️" : "🤍"}
        </button>
        <button onClick={() => addToCarrito(producto)} className={styles.botonCarro}>
          🛒
        </button>
      </div>
  );
}
