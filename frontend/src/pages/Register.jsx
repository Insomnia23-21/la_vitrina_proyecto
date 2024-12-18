import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Limpiar errores anteriores
    setSuccess(null); // Limpiar mensajes de éxito anteriores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://la-vitrina-backend.onrender.com/api/users/register", formData);
      setSuccess("¡Registro exitoso! Redirigiendo al login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirigir después de 2 segundos
    } catch (error) {
      setError("Error en el registro: " + (error.response?.data?.message || "Intenta de nuevo"));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Nombre"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Correo electrónico"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Contraseña"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Registrarse
        </button>
        {success && <div className="alert alert-success mt-3">{success}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default Register;