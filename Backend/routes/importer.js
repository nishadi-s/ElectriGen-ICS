const express = require("express");
const {
  createImporter,
  getImporters,
  getImporter,
  deleteImporter,
  updateImporter,
} = require("../controllers/importerController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

//GET all importers
router.get("/", authMiddleware([USER_ROLES.EXPORT_MANAGER]), getImporters);

//GET a single importer
router.get("/:id", authMiddleware([USER_ROLES.EXPORT_MANAGER]), getImporter);

//POST a new importer
router.post("/", authMiddleware([USER_ROLES.EXPORT_MANAGER]), createImporter);

//DELETE an importer
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.EXPORT_MANAGER]),
  deleteImporter
);

//UPDATE a importer
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.EXPORT_MANAGER]),
  updateImporter
);

module.exports = router;
