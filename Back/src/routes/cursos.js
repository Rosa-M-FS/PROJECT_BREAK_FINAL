const express = require("express");
const router = express.Router();
const Curso = require("../models/curso");
const { auth, isAdmin } = require("../middlewares/auth");


router.get("/", async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener cursos", error });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ msg: "Curso no encontrado" });
    res.json(curso);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener curso", error });
  }
});


router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const curso = new Curso(req.body);
    await curso.save();
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).json({ msg: "Error al crear curso", error });
  }
});


router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!curso) return res.status(404).json({ msg: "Curso no encontrado" });
    res.json(curso);
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar curso", error });
  }
});


router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const curso = await Curso.findByIdAndDelete(req.params.id);
    if (!curso) return res.status(404).json({ msg: "Curso no encontrado" });
    res.json({ msg: "Curso eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al borrar curso", error });
  }
});

module.exports = router;
