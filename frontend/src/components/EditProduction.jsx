import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductionNavbar from "../components/ProductionNavbar";
import axios from "axios"; // Import axios for making HTTP requests

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

        console.log("Fetched date:", productionData.date);
        console.log("Fetched material details:", productionData.materials);
        console.log("Fetched product details:", productionData.products);
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
      // Update materials quantities in the database
      await Promise.all(
        materials.map(async (material) => {
          try {
            // Fetch the current quantity of the material
            const response = await axios.get(
              `/api/materials/code/${material.code}`
            );
            const currentQuantity = response.data.quantity;

            // Calculate the difference in quantity
            const quantityDifference =
              material.materialQuantity - currentQuantity;
            const newQuantity = currentQuantity + quantityDifference;

            // Update the material quantity in the database
            await axios.put(`/api/materials/code/${material.code}`, {
              quantity: newQuantity,
            });
          } catch (error) {
            console.error("Error updating material:", error);
            throw new Error("Failed to update material quantity");
          }
        })
      );

      // Update products quantities in the database
      await Promise.all(
        products.map(async (product) => {
          try {
            // Fetch the current quantity of the product
            const response = await axios.get(
              `/api/products/itemCode/${product.itemCode}`
            );
            const oldQuantity = response.data.quantity;

            // Calculate the difference in quantity
            const quantityDiff = product.quantity - oldQuantity;
            let newQuantity = oldQuantity + quantityDiff;

            // Ensure new quantity is non-negative
            if (newQuantity < 0) {
              newQuantity = 0;
            }

            // Update the product quantity in the database
            await axios.put(`/api/products/itemCode/${product.itemCode}`, {
              quantity: newQuantity,
            });
          } catch (error) {
            console.error("Error updating product:", error);
            throw new Error("Failed to update product quantity");
          }
        })
      );

      // Update the production record in the database
      const response = await fetch(`/api/productions/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduction),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating production:", errorData);
        throw new Error("Failed to update production");
      }

      navigate("/production"); // Redirect to production list page after successful update
    } catch (error) {
      console.error("Error updating production:", error);
      setError(error.message || "Failed to update production");
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
              <input type="text" value={material.materialName} readOnly />
              <label>Material Code:</label>
              <input type="text" value={material.materialNo} readOnly />
              <label>Material Quantity:</label>
              <input
                type="text"
                value={material.materialQuantity}
                onChange={(e) =>
                  handleMaterialChange(
                    index,
                    "materialQuantity",
                    e.target.value
                  )
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
              <input type="text" value={product.name} readOnly />
              <label>Product Item Code:</label>
              <input type="text" value={product.itemCode} readOnly />
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

        <button>Update Record</button>
        {error && <div className="error">{error}</div>}
      </form>
    </ProductionNavbar>
  );
};

export default EditProduction;
