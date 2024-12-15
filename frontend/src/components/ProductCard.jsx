import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, price }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Precio: ${price}</p>
          <Link to={`/product/${id}`} className="btn btn-primary">Ver Detalles</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;