require("dotenv").config(); // Load environment variables from the .env file
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
//laters
const cookieParser = require("cookie-parser");
const UserModel = require("./models/User.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
// Create an Express app
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method); // Log the path and HTTP method of each request
  next(); // Call the next middleware in the chain
});

/*email
// Endpoint to send emails
app.post('/send-email', (req, res) => {
  const { recipients, subject, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user:'electrigensystem@gmail.com', //updated email here
      pass: 'electrigen1234' //updated password here
    }
  });

  // Send emails to multiple recipients
  recipients.forEach((recipient) => {
    const mailOptions = {
      from: 'electrigensystem@gmail.com',
      to: recipient.email,
      subject: subject,
      text: `Hello ${recipient.name},\n\n${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });

  res.send('Emails sent successfully');
});//email*/

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

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

//primal sales route
const salesRouter = require("./routes/sales");
app.use("/sales", salesRouter);

//primal sales feedback route
const feedbackRouter = require("./routes/sfeedback");
app.use("/sfeedback", feedbackRouter);

//dulari
const dFeedbackRouter = require("./routes/dFeedback.js");
const projectRouter = require("./routes/DonationProjects.js");
app.use("/DonationProject", projectRouter);
app.use("/dFeedback", dFeedbackRouter);

//Dinithi
const orderRoutes = require("./routes/orders.js");
const distributorRoutes = require("./routes/distributor.js");

app.use("/api/orders", orderRoutes); // Order routes
app.use("/api/distributor", distributorRoutes); //distributor route(distributor authentication)

//Senith
const productRoutes = require("./routes/products.js");
const materialRoutes = require("./routes/materials.js");
const productionRoutes = require("./routes/production.js");
app.use("/api/products", productRoutes);
app.use("/api/productions", productionRoutes);
app.use("/api/materials", materialRoutes);
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Configure storage engine instead of dest object.
const upload = multer({ storage: storage });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  console.log(req.body);
  res.send("Uploaded!");
});

//uvindya
const salaryRoutes = require("./routes/salaries");
app.use("/api/salaries", salaryRoutes);
const userRoutes = require("./routes/userRoutes.js");
app.use("/api/users", userRoutes);

//Shanali
const exportRoutes = require("./routes/export");
const importerRoutes = require("./routes/importer");
app.use("/api/export", exportRoutes);
app.use("/api/importer", importerRoutes);

//Nishadi
const supplierChain_order = require("./routes/supplier_order"); //Nishadi
const supplier = require("./routes/supplier"); //Nishadi
app.use("/api/supplier_order", supplierChain_order); //Nishadi
app.use("/api/supplier", supplier); //Nishadi

//reset password
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.send({ Status: "User not existed" });
      }

      const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
        expiresIn: "1d",
      });

      // Create transporter with App Password
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "uvindyajayasundara@gmail.com",
          pass: "twpw ntzi iwxc hvtj", // Replace with your App Password
        },
      });

      var mailOptions = {
        from: "uvindyajayasundara@gmail.com",
        to: "uvindyahasanduni@gmail.com",
        subject: "Reset Password Link",
        text: `http://localhost:3000/reset-password/${user._id}/${token}`,
      };

      // Send the email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).send({ Status: "Error sending email" });
        } else {
          console.log("Email sent: " + info.response);
          res.send({ Status: "Email sent successfully" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ Status: "Error processing request" });
    });
});
app.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});
