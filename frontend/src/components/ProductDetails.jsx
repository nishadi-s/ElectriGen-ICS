import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useProductContext } from "../hooks/useProductsContext";
import { FaRegTrashCan } from "react-icons/fa6";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductContext();

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#233066",
      cancelButtonColor: "#EC2026",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch("/api/products/" + product._id, {
          method: "DELETE",
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "DELETE_PRODUCT", payload: json });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the product.",
            icon: "error",
          });
        }
      }
    });
  };

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
        <strong>Created At: </strong>
        {formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}
      </p>
      <button onClick={handleDelete}>
        <FaRegTrashCan />
      </button>
      <Link to={`/UpdateProduct/${product._id}`} className="edit-link">
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default ProductDetails;
