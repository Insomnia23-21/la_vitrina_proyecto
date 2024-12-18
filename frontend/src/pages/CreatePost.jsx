import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://la-vitrina-backend.onrender.com/api/products/create", formData, {
        headers: { Authorization: `Bearer ${token}` }, 
      });

      alert("Publicación creada exitosamente");
    } catch (error) {
      console.error("Error al crear la publicación:", error.message);
      alert("Error al crear la publicación");
    }
  };

  return (
    <div className="container mt-5 page-container">
      <h2>Crear Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Título"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Descripción"
            rows="4"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL de la Imagen</label>
          <input
            type="text"
            name="image"
            className="form-control"
            placeholder="URL de la imagen"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Precio"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Crear Publicación
        </button>
      </form>
    </div>
  );
};

export default CreatePost;