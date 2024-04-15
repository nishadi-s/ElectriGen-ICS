import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useProductionContext } from "../hooks/useProductionContext";
import { FaRegTrashCan } from "react-icons/fa6";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProductionDetails = ({ production }) => {
  const { dispatch } = useProductionContext();
  const [deleted, setDeleted] = useState(false);

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
        const response = await fetch("/api/production/" + production._id, {
          method: "DELETE",
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "DELETE_PRODUCTION", payload: json });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          }).then(() => {
            setDeleted(true);
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the record.",
            icon: "error",
          });
        }
      }
    });
  };

  if (deleted) {
    return null;
  }

  return (
    <div className="product-details">
      <h4>Date: {production.date}</h4>
      <h5>Materials:</h5>
      <ul>
        {production.materials.map((material, index) => (
          <li key={index}>
            {material.materialName} - {material.materialQuantity}
          </li>
        ))}
      </ul>
      <h5>Products:</h5>
      <ul>
        {production.products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.quantity}
          </li>
        ))}
      </ul>
      <button onClick={handleDelete}>
        <FaRegTrashCan />
      </button>
    </div>
  );
};

export default ProductionDetails;
