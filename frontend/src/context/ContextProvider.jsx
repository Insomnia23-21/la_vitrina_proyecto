const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware"); // Importa el middleware para proteger la ruta
const pool = require("../config/db");

// Ruta protegida para obtener el perfil del usuario
router.get("/profile", protect, async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;