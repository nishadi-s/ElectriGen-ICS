import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useProductContext } from "../hooks/useProductsContext";
import { FaRegTrashCan } from "react-icons/fa6";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "../senith.css";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductContext();

  return (
    <tr
      className="product-row"
      onMouseEnter={(e) => e.target.parentNode.classList.add("hovered")}
      onMouseLeave={(e) => e.target.parentNode.classList.remove("hovered")}
    >
      <td>
        <Link to={`/product/${product._id}`} className="product-link">
          {product.itemCode}
        </Link>
      </td>
      <td>
        <Link to={`/product/${product._id}`} className="product-link">
          {product.name}
        </Link>
      </td>
      <td>
        <Link to={`/product/${product._id}`} className="product-link">
          {product.color}
        </Link>
      </td>
      <td>
        <Link to={`/product/${product._id}`} className="product-link">
          {product.category}
        </Link>
      </td>

      <td>
        <Link to={`/product/${product._id}`} className="product-link">
          {product.unitPrice}
        </Link>
      </td>
      <td>
        <Link to={`/product/${product._id}`} className="product-link">
          {product.quantity}
        </Link>
      </td>
    </tr>
  );
};

export default ProductDetails;