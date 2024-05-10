import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { useProductionContext } from "../hooks/useProductionContext";
import format from "date-fns/format";

const ProductionDetails = ({ production }) => {
  const { dispatch } = useProductionContext();
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    Swal.fire({
      title: "Enter your password to confirm deletion",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const password = result.value;
        // Check if the entered password is correct
        if (password === "Sp123") {
          // Change "Sp123" to your actual password
          try {
            const response = await fetch(`/api/productions/${production._id}`, {
              method: "DELETE",
            });

            if (response.ok) {
              dispatch({ type: "DELETE_PRODUCTION", payload: production._id });
              setDeleted(true);
              Swal.fire(
                "Deleted!",
                "Your production has been deleted.",
                "success"
              ).then(() => {
                window.location.reload(); // Refresh the page after deletion
              });
            } else {
              throw new Error("Failed to delete the production");
            }
          } catch (error) {
            console.error("Error deleting production:", error);
            Swal.fire("Error!", "Failed to delete the production.", "error");
          }
        } else {
          // Incorrect password
          Swal.fire("Error!", "Incorrect password.", "error");
        }
      }
    });
  };

  useEffect(() => {
    if (deleted) {
      // Refetch production data here
      // Example:
      // fetchData();
      setDeleted(false); // Reset the deleted state
    }
  }, [deleted]);

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

        <Link
          to={`/update-production/${production._id}`}
          className="product-link"
        >
          <button className="button-1">Edit</button>
        </Link>
      </td>
    </tr>
  );
};

export default ProductionDetails;
