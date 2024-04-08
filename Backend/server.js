require("dotenv").config(); // Load environment variables from the .env file

const express = require("express");
const mongoose = require("mongoose");

//Senith
const productRoutes = require("./routes/products");

//Dinithi
const orderRoutes = require("./routes/orders.js");
const distributorRoutes = require("./routes/distributor.js");

// Create an Express app
const app = express();

// Middleware to parse JSON bodies of requests
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes); // Order routes
app.use("/api/distributor", distributorRoutes); //distributor route(distributor authentication)

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method); // Log the path and HTTP method of each request
  next(); // Call the next middleware in the chain
});

// Connect to MongoDB database

mongoose
  .connect(process.env.MONGO_URI) // Connect to the MongoDB URI defined in the environment variables
  .then(() => {
    // Listen for incoming requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & listening on port", process.env.PORT); // Log that the server is running
    });
  })
  .catch((error) => {
    console.log(error); // Log any errors that occur during database connection
  });
