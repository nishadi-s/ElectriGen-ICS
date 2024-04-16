const express = require("express");

const {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/orderController.js"); //controller function are from orderController.js
// const requireDisDAuth = require('../middleware/requireDisDAuth')
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

//require authentication for all order routers
// router.use(requireDisDAuth)

//establishing routes to manage orders

//GET all orders
router.get("/", authMiddleware([USER_ROLES.DISTRIBUTOR_MANAGER]), getOrders);

//GET a single order
router.get("/:id", authMiddleware([USER_ROLES.DISTRIBUTOR_MANAGER]), getOrder);

//POST a new order
router.post("/", authMiddleware([USER_ROLES.DISTRIBUTOR_MANAGER]), createOrder);

//DELETE an order
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.DISTRIBUTOR_MANAGER]),
  deleteOrder
);

//UPDATE an order
router.put(
  "/:id",
  authMiddleware([USER_ROLES.DISTRIBUTOR_MANAGER]),
  updateOrder
);

module.exports = router;
