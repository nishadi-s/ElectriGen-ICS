import React, { useState } from "react";
import axios from "axios";
import SalesNavbar from "../components/SalesNavbar";
import Swal from "sweetalert2";
import "../sales.css";

const SalesFeedback = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateName = (value) => {
    const namePattern = /^[a-zA-Z\s]*$/;
    if (!namePattern.test(value)) {
      setNameError("Name should only contain letters (A-Z or a-z) and spaces.");
    } else {
      setNameError("");
    }
  };

  const validatePhone = (value) => {
    const phonePattern = /^\d*$/;
    if (!phonePattern.test(value)) {
      setPhoneError("Phone should only contain numbers (0-9).");
    } else {
      setPhoneError("");
    }
  };

  const sendData = (e) => {
    e.preventDefault();

    // Validate fields before submitting
    validateName(name);
    validatePhone(phone);

    if (nameError || phoneError) {
      return;
    }

    const newFeedback = {
      name,
      phone,
      message
    };

    axios.post("http://localhost:4000/sfeedback/addf", newFeedback)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Submitted!",
          showConfirmButton: false,
          timer: 1500
        });
        window.location.reload();
      })
      .catch((err) => {
        console.error('Error submitting invoice:', err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error in Submitting!",
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  return (
    <SalesNavbar>
      <div>
        <h1 className="sales-header">Sales Feedback</h1>
        <div className="scontainer p-4 shadow-lg rounded">
          <form onSubmit={sendData}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Fernando B A P" 
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  validateName(e.target.value);
                }}
                onBlur={() => validateName(name)}
              />
              {nameError && <div className="text-danger">{nameError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="tel" className="form-control" id="phone" placeholder="07x xxxxxxx" 
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  validatePhone(e.target.value);
                }}
                onBlur={() => validatePhone(phone)}
              />
              {phoneError && <div className="text-danger">{phoneError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" rows="3" placeholder="Feedback message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </SalesNavbar>
  );
};

export default SalesFeedback;
