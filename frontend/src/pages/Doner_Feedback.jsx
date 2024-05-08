import React, { useState } from "react";
import axios from "axios";
import DonationNavbar from '../components/DonationNavbar';
import Swal from "sweetalert2";
import "../donation.css";

export default function Doner_Feedback() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validatePhoneNumber = (phone) => {
    const isValid = /^\d{10}$/.test(phone);
    return isValid;
  };

  const containsNumbers = (value) => {
    return /\d/.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors.name = "Please enter your name.";
    } else if (containsNumbers(name)) {
      formIsValid = false;
      errors.name = "Name should not contain numbers.";
    }

    if (!phone) {
      formIsValid = false;
      errors.phone = "Please enter your phone number.";
    } else if (!validatePhoneNumber(phone)) {
      formIsValid = false;
      errors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (!message) {
      formIsValid = false;
      errors.message = "Please enter your message.";
    }

    setErrors(errors);

    if (formIsValid) {
      // Send form data
      const newFeedback = {
        name,
        phone,
        message
      };

      axios.post("http://localhost:4000/dFeedback/addf", newFeedback)
        .then(() => {
          // Display success message using SweetAlert
          Swal.fire({
            icon: "success",
            title: "Feedback Submitted",
            text: "Thank you for your feedback!",
            confirmButtonText: "OK"
          });
          // Clear input fields
          setName("");
          setPhone("");
          setMessage("");
        })
        .catch((err) => {
          // Display error message using SweetAlert
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please try again.",
            confirmButtonText: "OK"
          });
          console.error(err);
        });
    }
  };

  return (
    <DonationNavbar>
      <div>
        <h1 className="don-header">Give Feedback</h1>
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              pattern="[0-9]*"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              id="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <input
              type="text"
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              id="message"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </DonationNavbar>
  );
}
