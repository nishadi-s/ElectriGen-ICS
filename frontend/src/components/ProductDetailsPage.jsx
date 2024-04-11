// ProductDetailsPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProductDetailsPage = ({ product }) => {
  return (
    <div className="product-details">
      <h4>Product Name: {product.name}</h4>
      <p>
        <strong>Category: </strong>
        {product.category}
      </p>
      <p>
        <strong>Color: </strong>
        {product.color}
      </p>
      <p>
        <strong>Product cost: </strong>
        {product.cost}
      </p>
      <p>
        <strong>Unit Price: </strong>
        {product.unitPrice}
      </p>
      <p>
        <strong>Available Quantity: </strong>
        {product.quantity}
      </p>
      <p>
        <strong>Created At: </strong>
        {formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}
      </p>
      <div className="product-actions">
        <Link to={`/edit-product/${product._id}`} className="edit-link">
          <button>Edit</button>
        </Link>
        <button>
          <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
