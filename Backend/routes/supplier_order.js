const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
} = require("../controllers/supplier_orderController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");
const router = express.Router();

// Get all orders
router.get(
  "/",
  authMiddleware([USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR]),
  getOrders
);

// Get a single order
router.get(
  "/:id",
  authMiddleware([USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR]),
  getOrderById
);

// POST a new order
router.post(
  "/",
  authMiddleware([USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR]),
  createOrder
);

// DELETE a single order
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR]),
  deleteOrder
);

// UPDATE a supplier order
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR]),
  updateOrder
);

module.exports = router;
