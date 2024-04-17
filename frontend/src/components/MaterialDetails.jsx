import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useMaterialContext } from "../hooks/useMaterialsContext";
import { FaRegTrashCan } from "react-icons/fa6";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "../senith.css";

const MaterialDetails = ({ material }) => {
  const { dispatch } = useMaterialContext();

  // Function to handle deletion of material
  const handleDelete = () => {
    // Add your deletion logic here
  };

  return (
    <tr
      className="product-row"
      onMouseEnter={(e) => e.target.parentNode.classList.add("hovered")}
      onMouseLeave={(e) => e.target.parentNode.classList.remove("hovered")}
    >
      <td>{material.code}</td>
      <td>{material.name}</td>
      <td>{material.unitPrice}</td>
      <td>{material.quantity}</td>
      <td>
        <Link to={`/materials/edit/${material._id}`}>
          <button className="edit-button">Edit</button>
        </Link>
      </td>
    </tr>
  );
};

export default MaterialDetails;
