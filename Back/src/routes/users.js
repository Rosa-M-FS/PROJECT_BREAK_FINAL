const express = require("express");
const router = express.Router();
const Usuario = require("../models/user");
const { auth, isAdmin } = require("../middlewares/auth");


router.get("/me", auth, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener perfil", error });
  }
});


router.put("/me", auth, async (req, res) => {
  try {
    const updates = { nombre: req.body.nombre, email: req.body.email };
    const usuario = await Usuario.findByIdAndUpdate(req.usuario.id, updates, { new: true }).select("-password");
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar perfil", error });
  }
});


router.get("/me/wishlist", auth, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).populate("wishlist");
    res.json(usuario.wishlist);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener wishlist", error });
  }
});


router.post("/me/wishlist/:productoId", auth, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario.wishlist.includes(req.params.productoId)) {
      usuario.wishlist.push(req.params.productoId);
      await usuario.save();
    }
    res.json(usuario.wishlist);
  } catch (error) {
    res.status(400).json({ msg: "Error al añadir a wishlist", error });
  }
});


router.delete("/me/wishlist/:productoId", auth, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    usuario.wishlist = usuario.wishlist.filter(id => id.toString() !== req.params.productoId);
    await usuario.save();
    res.json(usuario.wishlist);
  } catch (error) {
    res.status(400).json({ msg: "Error al quitar de wishlist", error });
  }
});


router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-password");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener usuarios", error });
  }
});

module.exports = router;
