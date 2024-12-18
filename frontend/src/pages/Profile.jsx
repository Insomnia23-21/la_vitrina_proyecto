import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/ContextProvider";
import axios from "axios";

const Profile = () => {
  const { user, login } = useContext(AppContext); // Obtener 'user' y 'login' del contexto
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Hacer la petición al backend para obtener los datos del perfil
        const response = await axios.get("https://la-vitrina-backend.onrender.com/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Actualizar el contexto con los datos del usuario
        login(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        localStorage.removeItem("token"); // Eliminar el token si es inválido
        navigate("/login");
      } finally {
        setLoading(false); // Terminar el estado de carga
      }
    };

    fetchProfile();
  }, [navigate, login]);

  if (loading) {
    return <p className="text-center mt-5">Cargando perfil...</p>;
  }

  if (!user) {
    return <p className="text-center mt-5">Redirigiendo al login...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Mi Perfil</h2>
      <div className="card p-4">
        <p><strong>Nombre de usuario:</strong> {user.name}</p>
        <p><strong>Correo Electrónico:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;