const express = require("express");
const router = express.Router();
const Material = require("../models/material");
const { auth, isAdmin } = require("../middlewares/auth");


router.get("/", async (req, res) => {
  try {
    const materiales = await Material.find();
    res.json(materiales);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener materiales", error });
  }
});


router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const material = new Material(req.body);
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ msg: "Error al crear material", error });
  }
});


router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!material) return res.status(404).json({ msg: "Material no encontrado" });
    res.json(material);
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar material", error });
  }
});


router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).json({ msg: "Material no encontrado" });
    res.json({ msg: "Material eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al borrar material", error });
  }
});

module.exports = router;
