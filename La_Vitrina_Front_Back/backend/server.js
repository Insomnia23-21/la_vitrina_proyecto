const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

// Middleware para permitir CORS
app.use(cors());

// Middleware para servir el frontend
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "¡Hola desde el backend!" });
});

// Redirigir cualquier ruta desconocida al frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});