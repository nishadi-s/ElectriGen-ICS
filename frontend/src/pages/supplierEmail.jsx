import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Grid, Typography, TextField, Button, Box } from "@mui/material"; // Import Material-UI components
import Swal from "sweetalert2"; // Import SweetAlert
import NavbarNishadi from "../components/SupplierOrderNavbar";
import "../SupplierOrder.css";

const SupplierEmail = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_dsaqtdk", "template_yq3rp39", form.current, {
        publicKey: "U3-HDcMqiQnT1OBPX",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          // Display success message using SweetAlert
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Email sent successfully!",
          });
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <NavbarNishadi>
      <h1> Sending Email </h1>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        {" "}
        {/* Decreased the minHeight */}
        <Grid container justifyContent="center">
          <Grid item xs={14} sm={40} md={10} lg={68}>
            <Box p={3} boxShadow={3} borderRadius={4} bgcolor="white">
              <Typography variant="h4" align="center" gutterBottom></Typography>
              <form ref={form} onSubmit={sendEmail}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="from_name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="from_email"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Message"
                      name="message"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      className="Sup_button"
                      type="submit"
                      variant="contained"
                      fullWidth
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </NavbarNishadi>
  );
};

export default SupplierEmail;
