require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

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
//Senith
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

//uvindya
const salaryRoutes = require('./routes/salaries');
app.use('/api/salaries', salaryRoutes);
const userRoutes=require('./routes/user')
app.use('/api/user',userRoutes)