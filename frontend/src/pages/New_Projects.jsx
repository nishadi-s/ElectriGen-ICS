import React, { useState } from "react";
import axios from "axios";

export default function ProjectDetails() {
  const [project_id, setID] = useState("");
  const [description, setDescription] = useState("");
  const [estimate_date, setDate] = useState("");
  const [total_amount, setAmount] = useState("");

  // Function to send project data
  function sendData(e) {
    e.preventDefault(); // Prevents the default form submission behavior

    const newProject = {
      project_id,
      description,
      estimate_date,
      total_amount,
    };

    // Add new project
    axios.post("http://localhost:4000/DonationProject/add", newProject)
      .then(() => {
        alert("Project added successfully");
        setID("");
        setDescription("");
        setDate("");
        setAmount(""); // Clearing totalAmount as well
      })
      .catch((err) => {
        alert(err);
      });

    // Update the project
    axios.put(`http://localhost:4000/DonationProject/update/${project_id}`, newProject)
      .then(() => {
        alert("Project updated successfully");
        setID("");
        setDescription("");
        setDate("");
        setAmount(""); // Clearing totalAmount as well
      })
      .catch((err) => {
        alert(err);
      });

    // Delete the project
    axios.delete(`http://localhost:4000/DonationProject/delete/${project_id}`)
      .then(() => {
        alert("Project deleted successfully");
        setID("");
        setDescription("");
        setDate("");
        setAmount(""); // Clearing totalAmount as well
      })
      .catch((err) => {
        alert(err);
      });

    // Fetch the project
    axios.get(`http://localhost:4000/DonationProject/get/${project_id}`)
      .then((response) => {
        // Handle the fetched project data
        const fetchedProject = response.data.project;
        // Do something with the fetched project data
      })
      .catch((err) => {
        alert(err);
      });
  }

  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { project_id: "", description: "", estimate_date: "", total_amount: "" }
    ]);
  };

  const handleInputChange = (index, name, value) => {
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleEditRow = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].isEditing = true;
    setRows(updatedRows);
  };

  const handleCancelEdit = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].isEditing = false;
    setRows(updatedRows);
  };

  return (
    <div className="container">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-8">
              <h2><b>Projects Details</b></h2>
            </div>
            <div className="col-sm-4">
              <button
                type="button"
                className="btn btn-info add-new"
                onClick={handleAddRow}
              >
                <i className="fa fa-plus"></i> Add New
              </button>
            </div>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Description</th>
              <th>Estimate Date</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.project_id}
                    onChange={(e) =>
                      handleInputChange(index, "project_id", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    value={row.estimate_date}
                    onChange={(e) =>
                      handleInputChange(index, "estimate_date", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.total_amount}
                    onChange={(e) =>
                      handleInputChange(index, "total_amount", e.target.value)
                    }
                  />
                </td>
                <td>
                  {row.isEditing ? (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          console.log("Saving changes for row:", index);
                          handleCancelEdit(index);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary ml-2"
                        onClick={() => handleCancelEdit(index)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-dark"
                      >
                        Add
                      </button>
                      <button
                        className="btn btn-dark ml-2"
                        onClick={() => handleEditRow(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-dark ml-2"
                        onClick={() => handleDeleteRow(index)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
