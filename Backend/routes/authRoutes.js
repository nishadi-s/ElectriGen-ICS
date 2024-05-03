const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/user/signup", authController.userSignup);
router.post("/login", authController.login);

module.exports = router;
