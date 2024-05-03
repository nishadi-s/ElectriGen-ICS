import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import ProductionNavbar from "../components/ProductionNavbar";

const ProductionForm = ({ uneditable }) => {
  const [date, setDate] = useState("");
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [productRecords, setProductRecords] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [materialQuantity, setMaterialQuantity] = useState("");
  const [selectedProductDetails, setSelectedProductDetails] = useState({});
  const [selectedMaterialDetails, setSelectedMaterialDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMaterials();
    fetchProducts();
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/materials");
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductSelect = async (productId) => {
    setSelectedProduct(productId);
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    if (selectedProduct) {
      setSelectedProductDetails(selectedProduct);
    }
  };

  const handleMaterialSelect = async (materialId) => {
    setSelectedMaterial(materialId);
    const selectedMaterial = materials.find(
      (material) => material._id === materialId
    );
    if (selectedMaterial) {
      setSelectedMaterialDetails(selectedMaterial);
    }
  };

  const handleAddProductRecord = () => {
    if (selectedProduct && productQuantity) {
      const newProductRecord = {
        product: selectedProduct,
        quantity: productQuantity,
        ...selectedProductDetails,
      };
      setProductRecords([...productRecords, newProductRecord]);
      // Clear input fields after adding
      setProductQuantity("");
      setSelectedProductDetails({});
    }
  };

  const handleAddMaterialRecord = () => {
    if (selectedMaterial && materialQuantity) {
      const newMaterialRecord = {
        material: selectedMaterial,
        quantity: materialQuantity,
        ...selectedMaterialDetails,
      };
      setProductRecords([...productRecords, newMaterialRecord]);
      // Clear input fields after adding
      setMaterialQuantity("");
      setSelectedMaterialDetails({});
    }
  };

  const handleRemoveProductRecord = (index) => {
    const updatedProductRecords = [...productRecords];
    updatedProductRecords.splice(index, 1);
    setProductRecords(updatedProductRecords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduction = {
      date,
      materials: [],
      products: productRecords,
    };

    try {
      // Submit new production record
      await axios.post("http://localhost:4000/api/production", newProduction);

      // Update material/product quantities
      productRecords.forEach(async (record) => {
        const { product, material, quantity } = record;
        if (product) {
          // Update product quantity logic
        } else if (material) {
          // Update material quantity logic
        }
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Added Production Record!",
        showConfirmButton: false,
        timer: 1500,
      });
      // Clear form fields
      setDate("");
      setProductRecords([]);
    } catch (err) {
      console.error("Error submitting production record:", err);
      setError("Failed to add production record");
    }
  };

  return (
    <div>
      <h1>Add Production Record</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formMaterial">
            <Form.Label>Material</Form.Label>
            <Form.Control
              as="select"
              value={selectedMaterial}
              onChange={(e) => handleMaterialSelect(e.target.value)}
            >
              <option value="">Select a material</option>
              {materials.map((material) => (
                <option key={material._id} value={material._id}>
                  {material.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>

        {selectedMaterialDetails && (
          <div>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formMaterialDetails">
                <Form.Label>Material name</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={selectedMaterialDetails.name}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formMaterialDetails">
                <Form.Label>Remaining Quantity</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={selectedMaterialDetails.quantity}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formMaterialQuantity">
                <Form.Label>Material Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={materialQuantity}
                  onChange={(e) => setMaterialQuantity(e.target.value)}
                />
              </Form.Group>
            </Row>
          </div>
        )}

        <Row className="mb-3">
          <Button variant="primary" onClick={handleAddMaterialRecord}>
            Add Material
          </Button>
        </Row>

        {selectedProductDetails && (
          <div>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formProduct">
                <Form.Label>Product</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedProduct}
                  onChange={(e) => handleProductSelect(e.target.value)}
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formProductDetails">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={selectedProductDetails.name}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formProductDetails">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={selectedProductDetails.category}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formProductDetails">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={selectedProductDetails.color}
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formProductDetails">
                  <Form.Label>Remaining Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={selectedProductDetails.quantity}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formProductQuantity">
                  <Form.Label>Product Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </Row>
          </div>
        )}

        <Row className="mb-3">
          <Button variant="primary" onClick={handleAddProductRecord}>
            Add Product
          </Button>
        </Row>

        <div>
          <div>
            {productRecords.map((record, index) => (
              <div key={index}>
                {record.product ? (
                  <div>
                    <p>Product Name: {record.name}</p>
                    <p>Item Code: {record.itemCode}</p>
                    <p>Quantity: {record.quantity}</p>
                  </div>
                ) : (
                  <div>
                    <p>Material Name: {record.name}</p>
                    <p>Material Name: {record.code}</p>
                    <p>Quantity: {record.quantity}</p>
                  </div>
                )}
                <Button
                  variant="danger"
                  onClick={() => handleRemoveProductRecord(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button variant="primary" type="submit">
          Add Production Record
        </Button>

        {error && <div className="error">{error}</div>}
      </Form>
    </div>
  );
};

export default ProductionForm;
