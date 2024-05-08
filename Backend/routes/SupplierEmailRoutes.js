const express = require("express");
const router = express.Router();

const { sendSupplierEmail } = require("../controllers/SupplierEmailController");

router.post("/sendSupplierEmail", sendSupplierEmail); 

module.exports = router;
