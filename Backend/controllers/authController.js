require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const authController = {
  userSignup: async (req, res) => {
    try {
      const { name, email, password, phoneNumber, address, role, age, dateOfBirth } = req.body;

      // Validate password: Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one digit
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          success: false,
          message: "Password must contain at least one uppercase letter, one lowercase letter, and one digit, with a minimum length of 8 characters",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
        role,
        age,
        dateOfBirth,
      });

      await newUser.save();

      res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          address: newUser.address,
          role: newUser.role,
          age: newUser.age,
          dateOfBirth: newUser.dateOfBirth,
        },
        message: `User ${newUser.name} registered successfully`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message, // Provide error message for debugging
      });
    }
  },
  // Your login function remains the same
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        // expiresIn: "1h",
      });

      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          role: user.role,
          age: user.age,
          dateOfBirth: user.dateOfBirth,
        },
        token,
        message: "Logged in successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message, // Provide error message for debugging
      });
    }
  },
};

module.exports = authController;



/*require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
//const userSignupSchema = require("../validations/userSignup.validation");

const authController = {
  userSignup: async (req, res) => {
    try {
      const { name, email, password, phoneNumber, address, role, age, dateOfBirth } = req.body;

      // Validate request body
      userSignupSchema.parse(req.body);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
        role,
        age,
        dateOfBirth,
      });

      await newUser.save();

      res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          address: newUser.address,
          role: newUser.role,
          age: newUser.age,
          dateOfBirth: newUser.dateOfBirth,
        },
        message: `User ${newUser.name} registered successfully`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message, // Provide error message for debugging
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        // expiresIn: "1h",
      });

      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          role: user.role,
          age: user.age,
          dateOfBirth: user.dateOfBirth,
        },
        token,
        message: "Logged in successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message, // Provide error message for debugging
      });
    }
  },
};

module.exports = authController;



/*require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const userSignupSchema = require("../validations/userSignup.validation");

const authController = {
  userSignup: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // validate request body
      userSignupSchema.parse(req.body);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          mobile: newUser.mobile,
          address: newUser.address,
        },
        message: `User ${newUser.name} registered successfully`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        // expiresIn: "1h",
      });

      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          address: user.address,
        },
        token,
        message: "Logged in successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = authController;*/
