const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: "https://la-vitrina-proyecto.onrender.com", // Cambia esta URL por la del frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "public")));

// Servir el archivo index.html para cualquier otra ruta
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});