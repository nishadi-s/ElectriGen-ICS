require("dotenv").config();


// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");
const supplierChain_order = require('./routes/supplier_order'); //Nishadi
const supplier = require('./routes/supplier'); //Nishadi

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/products", productRoutes);
app.use("/api/supplier_order",supplierChain_order); //Nishadi
app.use("/api/supplier",supplier); //Nishadi

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
