import React, { useState } from "react";
import "../senith.css";

const ProductionForm = () => {
  const [date, setDate] = useState("");
  const [materials, setMaterials] = useState([
    { materialName: "", materialNo: "", materialQuantity: "" },
  ]);
  const [products, setProducts] = useState([
    {
      productName: "",
      productNo: "",
      colors: [{ colorName: "", usableQty: "", damagedQty: "" }],
    },
  ]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [colors, setColors] = useState([{ color: "", quantity: "" }]); // Define colors state variable

  const handleAddMaterial = () => {
    setMaterials([
      ...materials,
      { materialName: "", materialNo: "", materialQuantity: "" },
    ]);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        productName: "",
        productNo: "",
        colors: [{ colorName: "", usableQty: "", damagedQty: "" }],
      },
    ]);
  };

  const handleAddColor = () => {
    setColors([...colors, { color: "", quantity: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const production = {
      date,
      materials,
      products,
    };

    // Perform validation and submit production data to the backend
    // You can use similar logic as in the ProductForm component

    console.log("Production data:", production);
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index] = { ...updatedMaterials[index], [field]: value };
    setMaterials(updatedMaterials);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  const handleColorChange = (index, field, value) => {
    const updatedColors = [...colors];
    updatedColors[index] = { ...updatedColors[index], [field]: value };
    setColors(updatedColors);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new production record</h3>
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
            type="text"
            value={material.materialQuantity}
            onChange={(e) =>
              handleMaterialChange(index, "materialQuantity", e.target.value)
            }
          />
        </div>
      ))}
      <button onClick={handleAddMaterial}>Add Material</button>
      {products.map((product, index) => (
        <div key={index}>
          <label>Product name ({index + 1}):</label>
          <input
            type="text"
            value={product.productName}
            onChange={(e) =>
              handleProductChange(index, "productName", e.target.value)
            }
          />
          <label>Product number ({index + 1}):</label>
          <input
            type="text"
            value={product.productNo}
            onChange={(e) =>
              handleProductChange(index, "productNo", e.target.value)
            }
          />
          {product.colors.map((color, colorIndex) => (
            <div key={colorIndex}>
              <label>Color name ({colorIndex + 1}):</label>
              <input
                type="text"
                value={color.colorName}
                onChange={(e) =>
                  handleColorChange(
                    index,
                    colorIndex,
                    "colorName",
                    e.target.value
                  )
                }
              />
              <label>Usable quantity ({colorIndex + 1}):</label>
              <input
                type="number"
                value={color.usableQty}
                onChange={(e) =>
                  handleColorChange(
                    index,
                    colorIndex,
                    "usableQty",
                    e.target.value
                  )
                }
              />
              <label>Damaged quantity ({colorIndex + 1}):</label>
              <input
                type="number"
                value={color.damagedQty}
                onChange={(e) =>
                  handleColorChange(
                    index,
                    colorIndex,
                    "damagedQty",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
          <button onClick={() => handleAddColor(index)}>Add Color</button>
        </div>
      ))}
      <button type="submit">Add Production Record</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductionForm;
