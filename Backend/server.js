require("dotenv").config(); // Load environment variables from the .env file
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");


// Create an Express app
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

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

//middleware-importer
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//primal sales route
const salesRouter = require("./routes/sales");
app.use("/sales", salesRouter);

//primal sales feedback route
const feedbackRouter = require("./routes/sfeedback");
app.use("/sfeedback", feedbackRouter);

//dulari
app.use("/dFeedback", dFeedbackRouter);
const projectRouter = require("./routes/DonationProjects.js");
app.use("/DonationProject", projectRouter);
const dFeedbackRouter = require("./routes/dFeedback.js");


//Dinithi
const orderRoutes = require("./routes/orders.js");
const distributorRoutes = require("./routes/distributor.js");
app.use("/api/orders", orderRoutes); // Order routes
app.use("/api/distributor", distributorRoutes); //distributor route(distributor authentication)

//Senith
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

//Shanali
const exportRoutes=require('./routes/export')
const importerRoutes=require('./routes/importer')
app.use('/api/export', exportRoutes)
app.use('/api/importer', importerRoutes)
