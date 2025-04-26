const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const userExist = await Usuario.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "El email ya está registrado" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({ nombre, email, password: hash });
    await nuevoUsuario.save();

    res.status(201).json({ msg: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ msg: "Error al registrar", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: "Usuario o contraseña incorrectos" });

    const validPass = await bcrypt.compare(password, usuario.password);
    if (!validPass) return res.status(400).json({ msg: "Usuario o contraseña incorrectos" });

    const token = jwt.sign(
      { id: usuario._id, esAdmin: usuario.esAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        esAdmin: usuario.esAdmin,
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al hacer login", error });
  }
});

module.exports = router;
