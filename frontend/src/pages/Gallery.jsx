import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config"; 
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
      } catch (err) {
        setError("Error fetching products");
        console.error("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Galería de Productos</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Precio: ${product.price}</strong>
                </p>
                <button
                  className="btn btn-primary btn-sm mb-2 w-100"
                  onClick={() => addToCart(product)}
                >
                  Añadir al Carrito
                </button>
                <Link to={`/product/${product.id}`} className="btn btn-secondary btn-sm w-100">
                  Ver Detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;