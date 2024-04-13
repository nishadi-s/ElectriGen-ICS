import React, { useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap"; // Import Table component from react-bootstrap

export default function New_Projects() {
  const [projectData, setProjectData] = useState({
    project_id: "",
    estimate_date: "",
    description: "",
    total_amount: 0,
    items: [], // Initialize items array
  });

  async function sendData(e) {
    e.preventDefault();

    try {
      // Send data to backend
      await axios.post("http://localhost:4000/DonationProject/add", projectData);
      alert("Project added successfully!");
      // Reset the form fields after successful submission
      setProjectData({
        project_id: "",
        estimate_date: "",
        description: "",
        total_amount: 0,
        items: [],
      });
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project. Please try again.");
    }
  }

  function handleAddRow() {
    setProjectData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          item: "",
          qty: 0,
          unitPrice: 0,
          price: 0,
        },
      ],
    }));
  }

  function handleInputChange(e, index, field) {
    const updatedItems = [...projectData.items];
    updatedItems[index][field] = e.target.value;
    setProjectData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
    updateTotalAmount(updatedItems);
  }

  function updateTotalAmount(updatedItems) {
    let total = 0;
    updatedItems.forEach((item) => {
      total += item.qty * item.unitPrice;
    });
    setProjectData((prevData) => ({
      ...prevData,
      total_amount: total,
    }));
  }

  return (
    <div>
      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="projectID">Project ID</label>
          <input
            type="text"
            className="form-control"
            id="projectID"
            placeholder="Enter Project ID"
            value={projectData.project_id}
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
                  <input
                    type="text"
                    value={item.item}
                    onChange={(e) => handleInputChange(e, index, "item")}
                  />
                </td>
                <td className="text-right">
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleInputChange(e, index, "qty")}
                  />
                </td>
                <td className="text-right">
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleInputChange(e, index, "unitPrice")
                    }
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
                <button
                  type="button"
                  className="btn btn-primary mr-2"
                  onClick={handleAddRow}
                >
                  Add Row
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    </div>
  );
}
