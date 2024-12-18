const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { protect } = require("../middlewares/authMiddleware");

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una nueva publicación (protegida por autenticación)
router.post("/create", protect, async (req, res) => {
  const { title, description, image } = req.body;
  const userId = req.user.id;

  try {
    await pool.query(
      "INSERT INTO products (title, description, image, user_id) VALUES ($1, $2, $3, $4)",
      [title, description, image, userId]
    );
    res.status(201).json({ message: "Publicación creada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;