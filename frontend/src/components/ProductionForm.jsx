import React, { useEffect, useState } from "react";
import { useProductionContext } from "../hooks/useProductionContext";
import "../senith.css";

const ProductionForm = ({ uneditable }) => {
  const { dispatch } = useProductionContext();
  const [date, setDate] = useState("");
  const [materials, setMaterials] = useState([
    { materialName: "", materialNo: "", materialQuantity: "" },
  ]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [selectedProductDetails, setSelectedProductDetails] = useState({});
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    // Fetch products from the database
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle product selection
  const handleProductSelect = async (productId) => {
    setSelectedProduct(productId);
    // Fetch product details based on selected product ID
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setSelectedProductDetails(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the new quantity after adding the manufactured quantity
    const newQuantity =
      selectedProductDetails.quantity + parseInt(productQuantity, 10);

    // Update the product quantity in the database
    const updateProductQuantity = async () => {
      try {
        const response = await fetch(`/api/products/${selectedProduct}`, {
          method: "PUT",
          body: JSON.stringify({ quantity: newQuantity }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to update product quantity");
        }
      } catch (error) {
        console.error("Error updating product quantity:", error);
        setError("Failed to update product quantity");
        return;
      }
    };

    const production = {
      date,
      materials,
      products: selectedProduct
        ? [
            {
              product: selectedProduct,
              quantity: productQuantity,
              ...selectedProductDetails,
            },
          ]
        : [],
    };

    const response = await fetch("/api/production", {
      method: "POST",
      body: JSON.stringify(production),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error || "Error adding production record");
      setEmptyFields(json.emptyFields || []);
    } else {
      // Update the product quantity only if the production record was successfully added
      await updateProductQuantity();

      setDate("");
      setMaterials([
        { materialName: "", materialNo: "", materialQuantity: "" },
      ]);
      setProducts([]);
      setSelectedProduct("");
      setSelectedProductDetails({});
      setProductQuantity("");
      setError(null);
      setEmptyFields([]);
      console.log("New record added successfully", json);
      dispatch({ type: "CREATE_PRODUCTION", payload: json });
    }
  };

  const handleAddMaterial = () => {
    setMaterials([
      ...materials,
      { materialName: "", materialNo: "", materialQuantity: "" },
    ]);
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index] = { ...updatedMaterials[index], [field]: value };
    setMaterials(updatedMaterials);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new record</h3>
      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={emptyFields.includes("date") ? "error" : ""}
      />
      {materials.map((material, index) => (
        <div key={index}>
          <label>Material name ({index + 1}):</label>
          <input
            type="text"
            value={material.materialName}
            onChange={(e) =>
              handleMaterialChange(index, "materialName", e.target.value)
            }
          />
          <label>Material number ({index + 1}):</label>
          <input
            type="text"
            value={material.materialNo}
            onChange={(e) =>
              handleMaterialChange(index, "materialNo", e.target.value)
            }
          />
          <label>Material quantity ({index + 1}):</label>
          <input
            type="number"
            value={material.materialQuantity}
            onChange={(e) =>
              handleMaterialChange(index, "materialQuantity", e.target.value)
            }
          />
        </div>
      ))}
      <button type="button" onClick={handleAddMaterial}>
        Add Material
      </button>

      <div>
        <label>Product name:</label>
        <select
          value={selectedProduct}
          onChange={(e) => handleProductSelect(e.target.value)}
          disabled={uneditable}
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
        {selectedProductDetails && (
          <div>
            <label>Product item code:</label>
            <input
              type="text"
              value={selectedProductDetails.itemCode || ""}
              readOnly
            />
            <label>Product unit price:</label>
            <input
              type="number"
              value={selectedProductDetails.unitPrice || ""}
              readOnly
            />
            <label>Product category:</label>
            <input
              type="text"
              value={selectedProductDetails.category || ""}
              readOnly
            />
            <label>Product color:</label>
            <input
              type="text"
              value={selectedProductDetails.color || ""}
              readOnly
            />
            <label>Product quantity:</label>
            <input
              type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </div>
        )}
      </div>

      <button type="submit">Add Production Record</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductionForm;
