import React, { useState, useRef } from "react";
import { useSalesContext } from "../hooks/useSalesContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; // Import Link for routing
import emailjs from "@emailjs/browser"; // Import EmailJS

const InvoiceDetails = ({ invoice }) => {
  const { dispatch } = useSalesContext();
  const [deleted, setDeleted] = useState(false); // State variable to track deletion
  const form = useRef();

  const sendEmailAndDelete = async (e) => {
    e.preventDefault();

    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Proceed with email sending and deletion
        emailjs
          .sendForm("service_f70u96e", "template_j4ppidw", form.current, {
            publicKey: "_pj3pwWp07QdEgu8v",
          })
          .then(
            async () => {
              console.log("Email sent successfully!");
              // Perform deletion logic
              const response = await fetch(
                `http://localhost:4000/sales/delete/${invoice.billID}`,
                {
                  method: "DELETE",
                }
              );

              if (response.ok) {
                const json = await response.json();
                dispatch({ type: "DELETE_SALES", payload: json });
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                setDeleted(true); // Update state to hide the component after deletion
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Failed to delete the product.",
                  icon: "error",
                });
              }

              // Show SweetAlert after email is sent and deletion is completed
              Swal.fire({
                title: "Email Sent and Record Deleted!",
                text: "Your email has been sent successfully and the record has been deleted.",
                icon: "success",
              });
            },
            (error) => {
              console.log("Failed to send email...", error);
              // Show error alert if email sending fails
              Swal.fire({
                title: "Error!",
                text: "Failed to send the email.",
                icon: "error",
              });
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your record is safe :)", "info");
      }
    });
  };

  // Check if the invoice is deleted and return null to hide the component
  if (deleted) {
    return null;
  }

  return (
    <div className="invoiceDetails">
      {/* Email form */}
      <form
        ref={form}
        onSubmit={sendEmailAndDelete}
        style={{ display: "none" }}
      >
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea
          name="message"
          defaultValue={`Invoice details:\nBill ID: ${
            invoice.billID
          }\nTotal Amount: ${invoice.tot}\nTotal Quantity: ${
            invoice.totqty
          }\nDate: ${new Date(
            invoice.bdate
          ).toLocaleDateString()}\nItems:\n${invoice.items
            .map(
              (item, index) =>
                `Item ${index + 1}: ${item.desc}, Quantity: ${
                  item.qty
                }, Price: ${item.price}, Item Amount: ${item.iamount}`
            )
            .join("\n")}`}
        />
        <input type="submit" value="Send" />
      </form>

      <h4>Bill ID: {invoice.billID}</h4>
      <h5>Total Amount: {invoice.tot}</h5>
      <h5>Total Quantity: {invoice.totqty}</h5>
      <p>Date: {new Date(invoice.bdate).toLocaleDateString()}</p>

      <ul>
        {invoice.items.map((item, index) => (
          <li key={index}>
            Item {index + 1}: {item.desc}, Quantity: {item.qty}, Price:{" "}
            {item.price}, Item Amount: {item.iamount}
          </li>
        ))}
      </ul>
      <br />
      {/* Add onClick event with the handleClick function */}
      <button className="btn btn-danger" onClick={sendEmailAndDelete}>
        Delete
      </button>

      {/* Link to the updating page with bill ID */}
      <Link to={`/InvoiceUpdate/${invoice.billID}`}>
        <button className="btn btn-primary">Update</button>
      </Link>
    </div>
  );
};

export default InvoiceDetails;
