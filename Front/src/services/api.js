const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";


export async function getProductos() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Error al cargar productos");
  return await res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error("No se pudo cargar el producto");
  return await res.json();
}

export async function loginUsuario({ email, password }) {
  const res = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error("Login incorrecto");
  return await res.json();
}

export async function registrarUsuario({ nombre, email, password }) {
  const res = await fetch("http://localhost:4000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password })
  });
  if (!res.ok) throw new Error("Registro incorrecto");
  return await res.json();
}

export async function crearProducto(data, isFormData = false) {
  const token = localStorage.getItem("token");
  return fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(isFormData ? {} : { "Content-Type": "application/json" })
    },
    body: isFormData ? data : JSON.stringify(data)
  }).then(res => {
    if (!res.ok) throw new Error("Error al crear producto");
    return res.json();
  });
}


/* export async function crearProducto(producto) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(producto)
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return await res.json();
} */

export async function borrarProducto(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Error al borrar producto");
  return await res.json();
}


export async function actualizarProducto(id, producto) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(producto)
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return await res.json();
}
