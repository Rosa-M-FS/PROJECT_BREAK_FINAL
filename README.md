# PROJECT_BREAK_FINAL
# 🧶 Tienda Artesanal - Project Break

Proyecto Fullstack desarrollado como parte del Sprint 23 y 24.

Una tienda online de productos artesanales, patrones, materiales y cursos donde los usuarios pueden explorar el catálogo, registrarse, iniciar sesión, añadir productos al carrito, gestionar compras y, si son administradores, gestionar el catálogo desde un panel privado.

---

## ✨ Funcionalidades principales

- Registro y login de usuarios
- Vista de tienda con productos artesanales y búsqueda por categorías
- Detalle de producto con descripción, imagen y precio
- Carrito de compra (añadir, quitar, vaciar y finalizar compra simulada)
- Wishlist
- Panel de administración para usuarios admin:
  - Crear, editar y borrar productos
  - Subida de imágenes
- Persistencia de datos con MongoDB (productos, usuarios, etc.)
- Autenticación JWT (Node.js + Express)
- Frontend en React con rutas protegidas
- Estilo responsive usando CSS Modules

---

## 🚀 Tecnologías utilizadas

- **Frontend:** React, React Router, CSS Modules, Vite
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Autenticación:** JWT
- **Subida de imágenes:** Multer
- **Despliegue:** Netlify/Vercel (frontend), Railway (backend)

---

## 🔒 Usuarios y roles

- **Usuario normal:**
  - Registrarse / Login
  - Comprar productos
  - Ver pedidos (futuro)
- **Admin:**
  - Acceso a panel privado (/admin)
  - Gestión de productos (crear, editar, borrar)

---

## Admin
rosa@gmail.com
contraseña:rosa
## Linea futura
completar panel admin (pedidos, materiales, cursos pasados, organización agenda)

completar perfil usuario, acceso a pedidos pasados, solicitud de cursos, opcion de solicitar productos elaborados bajo pedido eligiendo entre los materiales disponibles

Perfeccionar adaptación a distintos dispositivos
## 🧩 Estructura del proyecto

```plaintext
/Front
  /src
    /components
    /pages
    /context
    /services
    /styles
/Back
  /src
    /models
    /routes
    /middlewares
    index.js

