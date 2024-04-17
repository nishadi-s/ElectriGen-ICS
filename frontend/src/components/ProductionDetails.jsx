import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaRegTrashCan } from "react-icons/fa6";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProductionDetails = ({ production }) => {
  const handleDelete = async () => {
    // Add your deletion logic here
  };

  return (
    <tr
      className="production-row"
      onMouseEnter={(e) => e.target.parentNode.classList.add("hovered")}
      onMouseLeave={(e) => e.target.parentNode.classList.remove("hovered")}
    >
      <td>{production.date}</td>
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
        <button onClick={handleDelete}>
          <FaRegTrashCan />
        </button>
      </td>
    </tr>
  );
};

export default ProductionDetails;
