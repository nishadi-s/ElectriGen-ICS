const express = require("express");
const {
  createExport,
  getExports,
  getExport,
  deleteExport,
  updateExport,
} = require("../controllers/exportController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

//GET all exports
router.get("/", authMiddleware([USER_ROLES.EXPORT_MANAGER]), getExports);

//GET a single export
router.get("/:id", authMiddleware([USER_ROLES.EXPORT_MANAGER]), getExport);

//POST a new export
router.post("/", authMiddleware([USER_ROLES.EXPORT_MANAGER]), createExport);

//DELETE an export
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.EXPORT_MANAGER]),
  deleteExport
);

//UPDATE a export
router.patch("/:id", authMiddleware([USER_ROLES.EXPORT_MANAGER]), updateExport);

module.exports = router;
