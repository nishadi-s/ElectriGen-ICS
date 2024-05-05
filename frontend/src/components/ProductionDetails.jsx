import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { useProductionContext } from "../hooks/useProductionContext";
import format from "date-fns/format";

const ProductionDetails = ({ production }) => {
  const { dispatch } = useProductionContext();

  const handleDelete = async () => {
    Swal.fire({
      title: "Do you want to delete this production?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/productions/${production._id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            dispatch({ type: "DELETE_PRODUCTION", payload: production._id });
            Swal.fire(
              "Deleted!",
              "Your production has been deleted.",
              "success"
            );
          } else {
            throw new Error("Failed to delete the production");
          }
        } catch (error) {
          console.error("Error deleting production:", error);
          Swal.fire("Error!", "Failed to delete the production.", "error");
        }
      }
    });
  };

  return (
    <tr className="production-row">
      <td>{format(new Date(production.date), "yyyy-MM-dd")}</td>
      <td>
        <ul>
          {production.materials.map((material, index) => (
            <li key={index}>
              {material.materialName} - {material.materialQuantity}
            </li>
          ))}
        </ul>
      </td>
      <td>
        <ul>
          {production.products.map((product, index) => (
            <li key={index}>
              {product.name} - {product.quantity}
            </li>
          ))}
        </ul>
      </td>
      <td>
        <button className="button-2" onClick={handleDelete}>
          <FaRegTrashCan />
        </button>
        <Link to={`/production/${production._id}`} className="product-link">
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default ProductionDetails;
