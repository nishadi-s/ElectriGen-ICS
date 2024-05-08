import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../senith.css";
import ProductionNavbar from "../components/ProductionNavbar";
import Swal from "sweetalert2";

const EditMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables to store material data
  const [material, setMaterial] = useState({
    name: "",
    code: "",
    unitPrice: "",
    quantity: "",
  });
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Fetch material data based on ID
  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await fetch(`/api/materials/${id}`);
        const materialData = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch material data");
        }
        setMaterial(materialData);
      } catch (error) {
        console.error("Error fetching material data:", error);
        setError(error.message || "Failed to fetch material data");
      }
    };

    fetchMaterial();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show SweetAlert popup to confirm whether to save changes
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with updating material
        updateMaterial();
      } else if (result.isDenied) {
        // If denied, do nothing
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const updateMaterial = async () => {
    const response = await fetch(`/api/materials/${id}`, {
      method: "PUT",
      body: JSON.stringify(material),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Show success popup
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Material details have been updated",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Navigate to materials page after the timer runs out
        navigate(`/materials`);
      });
    } else {
      const errorData = await response.json();
      setError(errorData.error || "Error updating material");
      setEmptyFields(errorData.emptyFields || []);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prevMaterial) => ({
      ...prevMaterial,
      [name]: value,
    }));
  };

  return (
    <ProductionNavbar>
      <div className="production-header">
        <h1>Edit Material Details</h1>
      </div>
      <form className="create" onSubmit={handleSubmit}>
        <label>Material name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={material.name}
          className={emptyFields.includes("name") ? "error" : ""}
        />
        <label>Material code:</label>
        <input
          type="text"
          name="code"
          onChange={handleChange}
          value={material.code}
          className={emptyFields.includes("code") ? "error" : ""}
        />
        <label>Unit price (in Rs.):</label>
        <input
          type="number"
          name="unitPrice"
          onChange={handleChange}
          value={material.unitPrice}
          className={emptyFields.includes("unitPrice") ? "error" : ""}
        />
        <label>Quantity:</label>
        <input
          type="string"
          name="quantity"
          onChange={handleChange}
          value={material.quantity}
          className={emptyFields.includes("quantity") ? "error" : ""}
        />
        <button>Update Material</button>
        {error && <div className="error">{error}</div>}
      </form>
    </ProductionNavbar>
  );
};

export default EditMaterial;
