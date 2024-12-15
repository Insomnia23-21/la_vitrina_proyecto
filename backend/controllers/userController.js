const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("../utils/db");

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el usuario en la base de datos
    await query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Los datos ingresados son inválidos" });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Los datos ingresados son inválidos" });
    }

    // Generar un token
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener perfil del usuario
exports.getUserProfile = async (req, res) => {
  try {
    const user = await query("SELECT id, username FROM users WHERE id = $1", [
      req.user.id,
    ]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
