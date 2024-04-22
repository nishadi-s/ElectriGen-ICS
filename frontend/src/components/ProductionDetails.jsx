import React from "react";
import Swal from "sweetalert2";
import { FaRegTrashCan } from "react-icons/fa6";
import { format } from "date-fns";

const ProductionDetails = ({ production }) => {
  const formattedDate = format(new Date(production.date), "yyyy-MM-dd");

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
          const response = await fetch(`/api/productions/${production.id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            // Handle deletion success
            Swal.fire(
              "Deleted!",
              "Your production has been deleted.",
              "success"
            ).then(() => {
              // Refresh the page or fetch the data again here
              window.location.reload(); // Refresh the page
              // OR fetchProductionData(); // Call the function to fetch data again
            });
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
      <td>{formattedDate}</td>
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
      </td>
    </tr>
  );
};

export default ProductionDetails;
