import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../services/api";
import styles from "./Registro.module.css";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registrarUsuario({ nombre, email, password });
      navigate("/login"); 
    } catch (err) {
      setError("No se pudo crear el usuario (puede que ya exista)");
    }
  };

  return (
    <div className={styles.registroContainer}>
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>Crear cuenta</button>
      </form>
    </div>
  );
}
