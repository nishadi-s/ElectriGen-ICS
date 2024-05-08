import React, { useState } from "react";
import axios from "axios";
import DonationNavbar from '../components/DonationNavbar';

export default function Doner_Feedback() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function sendData(e) {
   e.preventDefault(); // Prevents the default form submission behavior

    const newFeedback = {
      name,
      phone,
      message
    };

    axios.post("http://localhost:4000/dFeedback/addf", newFeedback)
      .then(() => {
        alert("Feedback added successfully");
        setName("");
        setPhone("");
        setMessage("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <DonationNavbar>
    <div>
      <form className="feedback-form" onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <input
            type="text"
            className="form-control"
            id="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        



        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </DonationNavbar>
  );
}