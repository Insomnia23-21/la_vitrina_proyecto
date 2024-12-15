const jwt = require("jsonwebtoken");
const { query } = require("../utils/db");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar al usuario en la base de datos
      const user = await query("SELECT id, username FROM users WHERE id = $1", [
        decoded.id,
      ]);
      if (user.rows.length === 0) {
        return res.status(401).json({ message: "No autorizado" });
      }

      req.user = user.rows[0];
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Usuario no encontrado" });
    }
  } else {
    res.status(401).json({ message: "No autorizado, no existe usuario" });
  }
};

app.use(express.json({ type: 'application/json; charset=utf-8' }));
app.use(express.urlencoded({ extended: true }));