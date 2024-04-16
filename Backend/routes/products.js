const express = require("express");
const Product = require("../models/productModel");
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

//GET all products
router.get("/", authMiddleware([USER_ROLES.INVENTORY_MANAGER]), getProducts);

//GET a single product
router.get("/:id", authMiddleware([USER_ROLES.INVENTORY_MANAGER]), getProduct);

//POST a new product
router.post("/", authMiddleware([USER_ROLES.INVENTORY_MANAGER]), createProduct);

//DELETE a product
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.INVENTORY_MANAGER]),
  deleteProduct
);

//UPDATE a product
router.put(
  "/:id",
  authMiddleware([USER_ROLES.INVENTORY_MANAGER]),
  updateProduct
);

module.exports = router;
