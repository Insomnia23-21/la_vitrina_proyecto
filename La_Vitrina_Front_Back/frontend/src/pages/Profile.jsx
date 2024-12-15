import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/ContextProvider";

const Profile = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

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