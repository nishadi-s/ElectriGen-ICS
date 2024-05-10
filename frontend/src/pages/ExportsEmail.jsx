import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Button, Container, Form } from "react-bootstrap";
import ExportsNavBar from "../components/ExportsNavBar.jsx";
import Swal from "sweetalert2";
import "../exports.css"; // Import CSS file for styling

const ExportsEmail = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const nameField = form.current.elements.from_name;
    const emailField = form.current.elements.from_email;
    const messageField = form.current.elements.message;

    // Validate name field
    if (!/^[a-zA-Z\s]+$/.test(nameField.value)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "Name field should contain only letters",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Validate all fields are filled
    if (!nameField.value || !emailField.value || !messageField.value) {
      Swal.fire({
        icon: "error",
        title: "All fields are required",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    emailjs
      .sendForm("service_9x3bmv4", "template_frfkk3d", form.current, {
        publicKey: "wCQlekhoFOQvbR9XY",
      })
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Email Sent Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          form.current.reset(); // Reset form fields
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Failed to Send Email",
            text: error.text,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  };

  return (
    <div className="ex-email with-background">
      <ExportsNavBar>
        <h1>Send an Email</h1>
        <Container>
          <div className="exports-email-form">
            <Form ref={form} onSubmit={sendEmail}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="from_name"
                  placeholder="Enter your name"
                  pattern="[A-Za-z\s]+"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="from_email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="message"
                  placeholder="Enter your message"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Container>
      </ExportsNavBar>
    </div>
  );
};

export default ExportsEmail;
