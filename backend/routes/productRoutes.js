const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { protect } = require("../middlewares/authMiddleware");

// Obtener todos los productos
router.get("/", async (req, res) => {
  console.log("Solicitud recibida en /api/products");
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una nueva publicación (protegida por autenticación)
router.post("/create", protect, async (req, res) => {
  const { title, description, image, price } = req.body; // Agregamos el campo 'price'
  const userId = req.user.id;

  try {
    await pool.query(
      "INSERT INTO products (title, description, image, price, user_id) VALUES ($1, $2, $3, $4, $5)", // Actualizamos la consulta
      [title, description, image, price, userId] // Añadimos 'price' a los valores
    );
    res.status(201).json({ message: "Publicación creada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;