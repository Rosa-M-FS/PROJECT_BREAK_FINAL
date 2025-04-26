require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());


const authRoutes = require("./routes/auth");
const productosRoutes = require("./routes/products");
const materialesRoutes = require("./routes/materials");
const cursosRoutes = require("./routes/cursos");
const pedidosRoutes = require("./routes/pedidos");
const usuariosRoutes = require("./routes/users");

app.use("/api/auth", authRoutes);
app.use("/api/products", productosRoutes);
app.use("/api/materials", materialesRoutes);
app.use("/api/cursos", cursosRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/users", usuariosRoutes);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error al conectar a MongoDB:", err));
