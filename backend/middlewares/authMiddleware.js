const jwt = require("jsonwebtoken");
const pool = require("../config/db");

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // Buscar al usuario en la base de datos
      const result = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [decoded.id]);
      if (result.rows.length === 0) {
        return res.status(401).json({ message: "No autorizado" });
      }

      req.user = result.rows[0];
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Token inválido" });
    }
  } else {
    res.status(401).json({ message: "No autorizado, no hay token" });
  }
};