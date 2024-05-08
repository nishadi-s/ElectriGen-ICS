import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductionContext } from "../hooks/useProductionContext";

const ProductionForm = () => {
  const { dispatch } = useProductionContext();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [materials, setMaterials] = useState([
    { materialName: "", materialNo: "", materialQuantity: "" },
  ]);
  const [products, setProducts] = useState([
    { name: "", itemCode: "", quantity: "" },
  ]);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allProductNames, setAllProductNames] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("/api/materials");
        if (response.ok) {
          const data = await response.json();
          setAllMaterials(data); // Store all materials with their details
        } else {
          setError("Failed to fetch materials");
        }
      } catch (error) {
        setError("An error occurred while fetching materials");
        console.error("Error fetching materials:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setAllProducts(data); // Store all products with their details
          const productNames = data.map((product) => product.name);
          setAllProductNames(productNames);
        } else {
          setError("Failed to fetch products");
        }
      } catch (error) {
        setError("An error occurred while fetching products");
        console.error("Error fetching products:", error);
      }
    };

    fetchMaterials();
    fetchProducts();
  }, []);

  const addNewMaterial = () => {
    setMaterials([
      ...materials,
      { materialName: "", materialNo: "", materialQuantity: "" },
    ]);
  };

  const addNewProduct = () => {
    setProducts([...products, { name: "", itemCode: "", quantity: "" }]);
  };

  const handleMaterialNameChange = (index, selectedName) => {
    // Find the material details corresponding to the selected name
    const selectedMaterial = allMaterials.find(
      (material) => material.name === selectedName
    );
    if (selectedMaterial) {
      const updatedMaterials = [...materials];
      updatedMaterials[index].materialName = selectedName;
      updatedMaterials[index].materialNo = selectedMaterial.code;
      setMaterials(updatedMaterials);
    }
  };

  const handleProductNameChange = (index, selectedName) => {
    // Find the product details corresponding to the selected name
    const selectedProduct = allProducts.find(
      (product) => product.name === selectedName
    );
    if (selectedProduct) {
      const updatedProducts = [...products];
      updatedProducts[index].name = selectedName;
      updatedProducts[index].itemCode = selectedProduct.itemCode; // Assuming the property name is itemCode
      setProducts(updatedProducts);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const production = {
        date,
        materials,
        products,
      };

      const response = await fetch("/api/productions", {
        method: "POST",
        body: JSON.stringify(production),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
      } else {
        // Update material quantities
        materials.forEach(async (material) => {
          try {
            const materialCode = material.materialNo; // Assuming materialNo is the material code
            const quantity = parseInt(material.materialQuantity);

            // Fetch current material details
            const materialResponse = await fetch(
              `/api/materials/code/${materialCode}`
            );
            if (!materialResponse.ok) {
              throw new Error("Failed to fetch material details");
            }
            const materialData = await materialResponse.json();

            // Update material quantity
            const updatedQuantity = materialData.quantity + quantity;

            // Perform the update using Fetch
            const updateResponse = await fetch(
              `/api/materials/${materialData._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: updatedQuantity }),
              }
            );

            if (!updateResponse.ok) {
              throw new Error("Failed to update material quantity");
            }
          } catch (error) {
            console.error("Error updating material quantity:", error);
            // Handle error updating material quantity
          }
        });

        // Reset form fields and state
        setDate("");
        setMaterials([
          { materialName: "", materialNo: "", materialQuantity: "" },
        ]);
        setProducts([{ name: "", itemCode: "", quantity: "" }]);
        setError(null);
        setEmptyFields([]);
        console.log("new production added", json);
        dispatch({ type: "CREATE_PRODUCTION", payload: json });
      }
    } catch (error) {
      setError("An error occurred while submitting the production.");
      console.error("Error submitting production:", error);
    }

    navigate("/Production");
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Production Form</h3>

      <div className="input-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={emptyFields.includes("date") ? "error" : ""}
        />
      </div>

      <label className="material-label">Materials</label>
      <div className="material-container">
        {materials.map((material, index) => (
          <div key={index} className="material-fields">
            <label>Material({index + 1}) Name</label>
            <select
              value={material.materialName}
              onChange={(e) => handleMaterialNameChange(index, e.target.value)}
            >
              <option value="">Select material name</option>
              {allMaterials.map((material, idx) => (
                <option key={idx} value={material.name}>
                  {material.name}
                </option>
              ))}
            </select>
            <label>Material({index + 1}) Number</label>
            <input
              type="text"
              value={material.materialNo}
              onChange={(e) => {
                const updatedMaterials = [...materials];
                updatedMaterials[index].materialNo = e.target.value;
                setMaterials(updatedMaterials);
              }}
            />
            <label>Material({index + 1}) Quantity</label>
            <input
              type="number"
              value={material.materialQuantity}
              onChange={(e) => {
                const updatedMaterials = [...materials];
                updatedMaterials[index].materialQuantity = e.target.value;
                setMaterials(updatedMaterials);
              }}
            />
          </div>
        ))}
      </div>

      <button type="button" onClick={addNewMaterial}>
        Add Material
      </button>

      <label className="product-label">Products</label>
      <div className="product-container">
        {products.map((product, index) => (
          <div key={index} className="product-fields">
            <label>Product({index + 1}) Name</label>
            <select
              value={product.name}
              onChange={(e) => handleProductNameChange(index, e.target.value)}
            >
              <option value="">Select product name</option>
              {allProductNames.map((name, idx) => (
                <option key={idx} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <label>Product({index + 1}) Item Code</label>
            <input
              type="text"
              value={product.itemCode}
              onChange={(e) => {
                const updatedProducts = [...products];
                updatedProducts[index].itemCode = e.target.value;
                setProducts(updatedProducts);
              }}
            />
            <label>Product({index + 1}) Quantity</label>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => {
                const updatedProducts = [...products];
                updatedProducts[index].quantity = e.target.value;
                setProducts(updatedProducts);
              }}
            />
          </div>
        ))}
      </div>

      <button type="button" onClick={addNewProduct}>
        Add Product
      </button>

      <button type="submit">Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductionForm;
