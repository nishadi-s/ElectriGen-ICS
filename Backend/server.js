require("dotenv").config(); // Load environment variables from the .env file
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

// Create an Express app
const app = express();
app.use(cors());

//Senith
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

//Dinithi
const orderRoutes = require('./routes/orders.js');
const distributorRoutes = require('./routes/distributor.js');
app.use('/api/orders', orderRoutes); // Order routes
app.use('/api/distributor', distributorRoutes); //distributor route(distributor authentication)




// Middleware to parse JSON bodies of requests
app.use(express.json());


// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method); // Log the path and HTTP method of each request
  next(); // Call the next middleware in the chain
});

//Primal
app.use(cors());
app.use(bodyParser.json());

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



//primal sales route
const salesRouter = require("./routes/sales");
app.use("/sales",salesRouter);

//primal sales feedback route
const feedbackRouter = require("./routes/sfeedback");
app.use("/sfeedback",feedbackRouter);

