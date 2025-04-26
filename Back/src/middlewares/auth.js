const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token, acceso denegado" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token no válido" });
  }
}

function isAdmin(req, res, next) {
  if (req.usuario && req.usuario.esAdmin) {
    next();
  } else {
    res.status(403).json({ msg: "Solo administradores" });
  }
}

module.exports = { auth, isAdmin };
