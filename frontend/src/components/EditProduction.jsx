import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductionNavbar from "../components/ProductionNavbar";

const EditProduction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduction = async () => {
      try {
        const response = await fetch(`/api/productions/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch production data");
        }
        const productionData = await response.json();

        // Update state with fetched data
        setDate(productionData.date);
        setMaterials(productionData.materials);
        setProducts(productionData.products);
      } catch (error) {
        console.error("Error fetching production data:", error);
        setError("Failed to fetch production data");
      } finally {
        setIsLoading(false); // Set loading to false after fetching (success or failure)
      }
    };

    fetchProduction();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduction = {
      date,
      materials,
      products,
    };

    try {
      const response = await fetch(`/api/productions/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduction),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/production"); // Redirect to production list page after successful update
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error updating production");
        setEmptyFields(errorData.emptyFields || []);
      }
    } catch (error) {
      console.error("Error updating production:", error);
      setError("Failed to update production");
    }
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index][field] = value;
    setMaterials(updatedMaterials);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  return (
    <ProductionNavbar>
      <form className="create" onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={emptyFields.includes("date") ? "error" : ""}
        />

        <div>
          <h3>Materials</h3>
          {materials.map((material, index) => (
            <div key={index}>
              <label>Material Name:</label>
              <input
                type="text"
                value={material.name}
                onChange={(e) =>
                  handleMaterialChange(index, "name", e.target.value)
                }
              />
              <label>Material Code:</label>
              <input
                type="text"
                value={material.code}
                onChange={(e) =>
                  handleMaterialChange(index, "code", e.target.value)
                }
              />
              <label>Material Quantity:</label>
              <input
                type="text"
                value={material.quantity}
                onChange={(e) =>
                  handleMaterialChange(index, "quantity", e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <div>
          <h3>Products</h3>
          {products.map((product, index) => (
            <div key={index}>
              <label>Product Name:</label>
              <input
                type="text"
                value={product.name}
                readOnly
                onChange={(e) =>
                  handleProductChange(index, "name", e.target.value)
                }
              />
              <label>Product Code:</label>
              <input
                type="text"
                value={product.itemCode}
                readOnly
                onChange={(e) =>
                  handleProductChange(index, "name", e.target.value)
                }
              />
              <label>Product Quantity:</label>
              <input
                type="text"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(index, "quantity", e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <button>Update Production</button>
        {error && <div className="error">{error}</div>}
      </form>
    </ProductionNavbar>
  );
};

export default EditProduction;
