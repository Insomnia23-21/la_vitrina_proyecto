const jwt = require("jsonwebtoken");
const pool = require("../config/db"); // Cambié `query` por `pool` para usar la conexión existente

// Middleware para proteger rutas
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verificar el token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // Buscar al usuario en la base de datos
      const result = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [
        decoded.id,
      ]);

      if (result.rows.length === 0) {
        return res.status(401).json({ message: "No autorizado" });
      }

      req.user = result.rows[0];
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Token no válido o usuario no encontrado" });
    }
  } else {
    res.status(401).json({ message: "No autorizado, no se proporcionó un token" });
  }
};

module.exports = { protect };