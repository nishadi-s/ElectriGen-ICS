const express = require("express");
const Product = require("../models/productModel");
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getLowQuantityProducts,
  getProductByItemCode,
} = require("../controllers/productController");

const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET a single product by ID
router.get("/:id", getProduct);

// GET a single product by item code
router.get("/itemCode/:itemCode", getProductByItemCode);

// POST a new product
router.post("/", createProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

// UPDATE a product
router.put("/:id", updateProduct);

// GET products with quantity less than 100
router.get("/lowquantity", getLowQuantityProducts); // Add this route

module.exports = router;
