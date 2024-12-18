import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: "", description: "", image: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://la-vitrina-backend.onrender.com/api/posts/create", formData, {
        headers: { Authorization: token },
      });
      alert("Publicación creada exitosamente");
    } catch (error) {
      console.error("Error al crear la publicación:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Título" onChange={handleChange} required />
      <textarea name="description" placeholder="Descripción" onChange={handleChange} required />
      <input type="text" name="image" placeholder="URL de la imagen" onChange={handleChange} required />
      <button type="submit">Crear Publicación</button>
    </form>
  );
};

export default CreatePost;