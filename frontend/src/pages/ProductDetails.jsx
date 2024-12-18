import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product details");
        console.error("Error fetching product details:", err.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <p className="text-danger mt-5">{error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-5">Cargando detalles del producto...</p>;
  }

  return (
    <div className="container mt-5 page-container">
      <h2>{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        className="img-fluid mb-4"
        style={{ maxHeight: "400px", objectFit: "cover" }}
      />
      <p>{product.description}</p>
      <p>
        <strong>Precio: ${product.price}</strong>
      </p>
      <button className="btn btn-primary" onClick={() => addToCart(product)}>
        Añadir al Carrito
      </button>
    </div>
  );
};

export default ProductDetails;