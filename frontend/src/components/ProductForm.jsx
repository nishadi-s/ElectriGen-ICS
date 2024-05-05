import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null); // State to store selected image file

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send image along with other product data
    const formData = new FormData();
    formData.append("image", image); // Append selected image file to FormData
    formData.append("name", name);
    formData.append("itemCode", itemCode);
    formData.append("category", category);
    formData.append("color", color);
    formData.append("unitPrice", unitPrice);
    formData.append("quantity", quantity);

    try {
      // Send FormData containing image and other product data to server
      const response = await axios.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      });
      // Handle response
      console.log("Upload success:", response.data);
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Product image uploaded successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      // Reset form fields after successful upload
      setName("");
      setItemCode("");
      setCategory("");
      setColor("");
      setUnitPrice("");
      setQuantity("");
      setImage(null);
    } catch (error) {
      // Handle error
      console.error("Error uploading image:", error);
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="itemCode">Item Code:</label>
      <input
        type="text"
        id="itemCode"
        value={itemCode}
        onChange={(e) => setItemCode(e.target.value)}
      />
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <label htmlFor="color">Color:</label>
      <input
        type="text"
        id="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <label htmlFor="unitPrice">Unit Price:</label>
      <input
        type="number"
        id="unitPrice"
        value={unitPrice}
        onChange={(e) => setUnitPrice(e.target.value)}
      />
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
