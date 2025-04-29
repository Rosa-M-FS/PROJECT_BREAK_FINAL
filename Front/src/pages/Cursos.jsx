import { useEffect, useState } from "react";
import { getCursos } from "../services/api";
import styles from "./Cursos.module.css";

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCursos().then(setCursos).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando cursos...</p>;

  return (
    <div className={styles.cursosContainer}>
      <h2>Cursos disponibles</h2>
      <div className={styles.grid}>
        {cursos.map(curso => (
          <div key={curso._id} className={styles.cursoCard}>
            <h3>{curso.titulo}</h3>
            <p>{curso.descripcion}</p>
            <p><b>Fecha:</b> {curso.fecha}</p>
            <p><b>Duración:</b> {curso.duracion}</p>
            <p><b>Plazas:</b> {curso.plazas}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
