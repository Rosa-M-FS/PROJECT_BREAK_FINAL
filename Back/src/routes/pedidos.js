const express = require("express");
const router = express.Router();
const Pedido = require("../models/pedido");
const { auth, isAdmin } = require("../middlewares/auth");


router.get("/mis-pedidos", auth, async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuario.id }).populate("items.producto");
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener tus pedidos", error });
  }
});


router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate("usuario").populate("items.producto");
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener pedidos", error });
  }
});


router.post("/", auth, async (req, res) => {
  try {
    const { items, metodoPago, total, direccionEnvio } = req.body;
    const nuevoPedido = new Pedido({
      usuario: req.usuario.id,
      items,
      metodoPago,
      total,
      direccionEnvio
    });
    await nuevoPedido.save();
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ msg: "Error al crear pedido", error });
  }
});


router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pedido) return res.status(404).json({ msg: "Pedido no encontrado" });
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar pedido", error });
  }
});


router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) return res.status(404).json({ msg: "Pedido no encontrado" });
    res.json({ msg: "Pedido eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al borrar pedido", error });
  }
});

module.exports = router;
