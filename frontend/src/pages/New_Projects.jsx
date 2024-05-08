import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import DonationNavbar from "../components/DonationNavbar";
import Swal from "sweetalert2"; // Import SweetAlert
import "../donation.css";


const GenerateProjectID = () => {
  const currentDate = new Date();
  const day = ('0' + currentDate.getDate()).slice(-2);
  const randomID = ('0000' + Math.floor(Math.random() * 10000)).slice(-4);
  return `${day}${randomID}`;
};

export default function NewProjects() {
  const [projectData, setProjectData] = useState({
    project_id: GenerateProjectID(), // Auto-generated project ID
    estimate_date: "",
    description: "",
    total_amount: 0,
    items: [],
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      // Deduct quantity of selected products from the database
      for (const item of projectData.items) {
        // Deduct quantity code...
      }
  
      // Add the project data to the database
      await axios.post("http://localhost:4000/DonationProject/add", projectData);
  
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
  
      setProjectData({
        project_id: GenerateProjectID(), // Generate new project ID
        estimate_date: "",
        description: "",
        total_amount: "",
        items: [],
      });
  
      // Redirect to DProjectDetails.jsx page
      window.location.href = "/DProjectDetails"; // Adjust the URL as per your route configuration
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project. Please try again.");
    }
  };
  

  const handleAddRow = () => {
    setProjectData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          item: "",
          qty: 0,
          unitPrice: 0,
        },
      ],
    }));
  };

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;
  
    // Validate if the input value is a positive number
    if (name === "qty" && parseInt(value) < 0) {
      // If the value is negative, set the input field to red and return
      e.target.classList.add("is-invalid");
      return;
    } else {
      // If the value is valid, remove the red color from the input field
      e.target.classList.remove("is-invalid");
    }
  
    const updatedItems = [...projectData.items];
    updatedItems[index][field] = value;
    const selectedProduct = products.find((product) => product.itemCode === value);
    if (selectedProduct) {
      updatedItems[index]["unitPrice"] = selectedProduct.unitPrice;
      updatedItems[index]["itemCode"] = selectedProduct.itemCode; // Add itemCode
    }
    setProjectData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
    updateTotalAmount(updatedItems);
  };
  

  const updateTotalAmount = (updatedItems) => {
    let total = 0;
    updatedItems.forEach((item) => {
      total += item.qty * item.unitPrice;
    });
    setProjectData((prevData) => ({
      ...prevData,
      total_amount: total,
    }));
  };

  console.log("Products:", products); // Log the products state

  return (
    <DonationNavbar>
      <div>
        <h1 className="don-header">Create New Project Record</h1>
        <form onSubmit={sendData}>
          <div className="form-group">
            <label htmlFor="projectID">Project ID</label>
            <input
              type="text"
              className="form-control"
              id="projectID"
              placeholder="Enter Project ID"
              value={projectData.project_id}
              readOnly
              onChange={(e) =>
                setProjectData((prevData) => ({
                  ...prevData,
                  project_id: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              placeholder="Enter Description"
              value={projectData.description}
              onChange={(e) =>
                setProjectData((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="estimateDate">Estimate Date</label>
            <input
              type="date"
              className="form-control"
              id="estimateDate"
              value={projectData.estimate_date}
              min={new Date().toISOString().split('T')[0]} // Set min attribute to current date
              onChange={(e) =>
                setProjectData((prevData) => ({
                  ...prevData,
                  estimate_date: e.target.value,
                }))
              }
            />
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan={3} className="text-center">
                  Description
                </th>
                <th className="text-right">Price</th>
              </tr>
              <tr>
                <th>Item</th>
                <th className="text-right">Qty.</th>
                <th className="text-right">Unit Price</th>
                <th className="text-right">Sum</th>
              </tr>
            </thead>
            <tbody>
              {projectData.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      as="select"
                      value={item.item}
                      name="item"
                      onChange={(e) => handleInputChange(e, index, "item")}
                    >
                      <option value="">Select an item</option>
                      {products.map((product) => (
                        <option key={product._id} value={product.itemCode}>
                          {product.itemCode}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                  <td className="text-right">
                    <Form.Control
                      type="number"
                      value={item.qty}
                      name="qty"
                      onChange={(e) => handleInputChange(e, index, "qty")}
                    />
                  </td>
                  <td className="text-right">
                    <Form.Control
                      type="number"
                      value={item.unitPrice}
                      name="unitPrice"
                      readOnly
                    />
                  </td>
                  <td className="text-right">{item.qty * item.unitPrice}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>Total Amount</td>
                <td className="text-right">{projectData.total_amount}</td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <Button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={handleAddRow}
                  >
                    Add Row
                  </Button>
                  <Button type="submit" className="btn btn-primary">
                    Submit
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </form>
      </div>
    </DonationNavbar>
  );
}
