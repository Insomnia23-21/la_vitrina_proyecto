import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/ContextProvider";
import axios from "axios";

const Profile = () => {
  const { user, login } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("https://la-vitrina-backend.onrender.com/api/users/profile", {
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
    <div>
      <h1>Hola, {user.name}!</h1>
    </div>
  ) : (
    <div>Cargando...</div>
  );
};