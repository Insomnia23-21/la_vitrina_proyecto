import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { Context } from "../context/ContextProvider";

const Profile = () => {
  const { user, login } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        login(response.data);
      } catch {
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate, login]);

  return user ? (
    <div className="container mt-5 page-container">
      <h2>Mi Perfil</h2>
      <div className="card p-4">
        <p><strong>Nombre de usuario:</strong> {user.name}</p>
        <p><strong>Correo Electrónico:</strong> {user.email}</p>
      </div>
    </div>
  ) : (
    <p className="text-center mt-5">Cargando perfil...</p>
  );
};

export default Profile;