require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");

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


app.use(cors());
app.use(bodyParser.json());

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



//primal route
const salesRouter = require("./routes/Sales");
app.use("/sales",salesRouter);


