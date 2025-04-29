import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Bienvenida a la tienda artesanal</h1>
      <p>Aquí encontrarás productos hechos a mano, patrones y cursos exclusivos.</p>
    </div>
  );
}
