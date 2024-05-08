import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useMaterialContext } from "../hooks/useMaterialsContext";
import { FaRegTrashCan } from "react-icons/fa6";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "../senith.css";

const MaterialDetails = ({ material }) => {
  const { dispatch, materials } = useMaterialContext();
  const navigate = useNavigate();

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
          try {
            const response = await fetch(`/api/materials/${material._id}`, {
              method: "DELETE",
            });

            if (response.ok) {
              dispatch({ type: "DELETE_MATERIAL", payload: material._id });
              Swal.fire(
                "Deleted!",
                "Your material has been deleted.",
                "success"
              ).then(() => {
                // Refresh the page or fetch the data again here
                window.location.reload(); // Refresh the page
                // OR fetchMaterialData(); // Call the function to fetch data again
              });
            } else {
              throw new Error("Failed to delete the material");
            }
          } catch (error) {
            console.error("Error deleting material:", error);
            Swal.fire("Error!", "Failed to delete the material.", "error");
          }
        } else {
          // Incorrect password
          Swal.fire("Error!", "Incorrect password.", "error");
        }
      }
    });
  };

  useEffect(() => {
    // Fetch data again after material is deleted
    const fetchData = async () => {
      try {
        const response = await fetch("/api/materials");
        if (!response.ok) {
          throw new Error("Failed to fetch materials");
        }
        const data = await response.json();
        dispatch({ type: "FETCH_MATERIALS", payload: data });
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Apply CSS class to make the row appear red if quantity is less than 100
  const rowClassName = material.quantity < 100 ? "low-quantity-row" : "";

  // Apply CSS class to make text appear red if material quantity is less than 100
  const textClassName = material.quantity < 100 ? "low-quantity-text" : "";

  return (
    <tr className={`product-row ${rowClassName}`}>
      <td
        style={{ fontWeight: "bold" }}
        className={`product-code ${textClassName}`}
      >
        {material.code}
      </td>
      <td className={`product-name ${textClassName}`}>{material.name}</td>
      <td className={`product-unit-price ${textClassName}`}>
        Rs. {material.unitPrice}
      </td>
      <td className={`product-quantity ${textClassName}`}>
        {material.quantity}
      </td>
      <td>
        <Link to={`/edit-material/${material._id}`}>
          <button className="button-1">Edit</button>
        </Link>
        <button className="button-2" onClick={handleDelete}>
          <FaRegTrashCan />
        </button>
      </td>
    </tr>
  );
};

export default MaterialDetails;
