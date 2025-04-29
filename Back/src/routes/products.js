const express = require("express");
const router = express.Router();
const Producto = require("../models/product");
const { auth, isAdmin } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener productos", error });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener producto", error });
  }
});


router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ msg: "Error al crear producto", error });
  }
});


router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar producto", error });
  }
});


router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });
    res.json({ msg: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al borrar producto", error });
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // carpeta 'uploads' en tu proyecto
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // nombre único para cada imagen
  }
});

const upload = multer({ storage });
router.post("/upload", upload.single("imagen"), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No se subió ninguna imagen" });
  // La URL a la imagen (ajusta si usas Railway o similar)
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});
module.exports = router;
