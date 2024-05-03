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

  return (
    <tr className="product-row">
      <td className="product-code">
        
          {material.code}
        
      </td>
      <td className="product-name">{material.name}</td>
      <td className="product-quantity">{material.quantity}</td>
      <td className="product-quantity">{material.quantity}</td>
      <td>
      </td>
    </tr>
  );
};

export default MaterialDetails;
