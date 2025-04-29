import { useEffect, useState } from "react";
import { getMateriales } from "../services/api";
import styles from "./Material.module.css";

export default function Materiales() {
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMateriales().then(setMateriales).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando materiales...</p>;

  return (
    <div className={styles.materialesContainer}>
      <h2>Materiales disponibles</h2>
      <ul className={styles.lista}>
        {materiales.map(mat => (
          <li key={mat._id}>
            <b>{mat.nombre}</b> ({mat.tipo})
          </li>
        ))}
      </ul>
    </div>
  );
}
