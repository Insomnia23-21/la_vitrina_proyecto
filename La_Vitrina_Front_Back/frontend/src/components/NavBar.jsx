import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const NavBar = () => {
  const { cart } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">La Vitrina</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">Galería</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Mi Perfil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-post">Nueva Publicación</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Registro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Carrito
                {cart.length > 0 && (
                  <span className="badge bg-danger ms-2">{cart.length}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;