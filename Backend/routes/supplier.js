const express = require("express");
const {
  createSupplier,
  getSuppliers,
  getSupplierById,
  deleteSupplier,
  updateSupplier,
} = require("../controllers/supplierController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");
const router = express.Router();

// Get all suppliers
router.get(
  "/",
  authMiddleware([USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR]),
  getSuppliers
);

// Get a single supplier
router.get(
  "/:id",
  authMiddleware([USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR]),
  getSupplierById
);

// POST a new supplier
router.post(
  "/",
  authMiddleware([USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR]),
  createSupplier
);

// DELETE a single supplier
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR]),
  deleteSupplier
);

// UPDATE a supplier
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR]),
  updateSupplier
);

module.exports = router;
