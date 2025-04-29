import { useState, useEffect } from "react";
import { getProductos, crearProducto, borrarProducto, actualizarProducto } from "../services/api";
import styles from "./Admin.module.css";

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [imagen, setImagen] = useState(null);




  useEffect(() => {
    getProductos().then(setProductos);
  }, []);

  
const handleImageChange=(e)=> {
  setImagen(e.target.files[0]);
}
  
  async function handleCrear(e) {
    e.preventDefault();
    setError(""); setMensaje("");
    try {
      /* const producto = await crearProducto({ nombre, descripcion, precio: Number(precio) }); */
     
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("descripcion", descripcion);
      formData.append("precio", precio);
      if (imagen) {
        formData.append("imagen", imagen);
      }
      const producto = await crearProducto(formData, true); // <-- true para avisar que es FormData
            setProductos(prev => [...prev, producto]);
      setNombre(""); setDescripcion(""); setPrecio("");
      setMensaje("Producto creado correctamente");
    } catch (err) {
      setError("Error al crear producto (¿eres admin?)");
    }
  }

  async function handleBorrar(id) {
    setError(""); setMensaje("");
    try {
      await borrarProducto(id);
      setProductos(prev => prev.filter(p => p._id !== id));
      setMensaje("Producto borrado");
    } catch (err) {
      setError("Error al borrar producto (¿eres admin?)");
    }
  }

  function empezarEditar(prod) {
    setEditando(prod._id);
    setNombre(prod.nombre|| "");
    setDescripcion(prod.descripcion|| "");
    setPrecio(prod.precio|| "");
  }

  async function handleActualizar(e) {
    e.preventDefault();
    setError(""); setMensaje("");
    try {
      const producto = await actualizarProducto(editando, { nombre, descripcion, precio: Number(precio) });
      setProductos(prev =>
        prev.map(p => (p._id === editando ? producto : p))
      );
      setEditando(null);
      setNombre(""); setDescripcion(""); setPrecio("");
      setMensaje("Producto actualizado");
    } catch (err) {
      setError("Error al actualizar producto");
    }
  }

  function cancelarEditar() {
    setEditando(null);
    setNombre(""); setDescripcion(""); setPrecio("");
  }

  return (
    <div className={styles.adminContainer}>
      <h2>Panel de Administración</h2>

      <form onSubmit={editando ? handleActualizar : handleCrear} className={styles.form}>
        <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
        <input value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" required />
        <input value={precio} onChange={e => setPrecio(e.target.value)} placeholder="Precio (€)" required type="number" min="0" step="0.01"/>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">{editando ? "Actualizar" : "Crear producto"}</button>
        {editando && <button type="button" onClick={cancelarEditar}>Cancelar</button>}
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {mensaje && <p className={styles.mensaje}>{mensaje}</p>}

      <h3>Productos actuales</h3>
      <ul className={styles.lista}>
        {productos.map(prod => (
          <li key={prod._id} className={styles.item}>
            <b>{prod.nombre}</b> - {prod.precio} €
            <button onClick={() => empezarEditar(prod)}>Editar</button>
            <button onClick={() => handleBorrar(prod._id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );

  
}
