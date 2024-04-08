require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//senith
const productRoutes = require("./routes/products");

//dulari
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRouter = require("./routes/DonationProjects.js");


const app = express(); // Declare 'app' once


const dFeedbackRouter = require("./routes/dFeedback.js");






app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/DonationProject", projectRouter);
app.use("/dFeedback", dFeedbackRouter);


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/products", productRoutes);




mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
