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



//primal sales route
const salesRouter = require("./routes/sales");
app.use("/sales",salesRouter);

//primal sales feedback route
const feedbackRouter = require("./routes/sfeedback");
app.use("/sfeedback",feedbackRouter);

