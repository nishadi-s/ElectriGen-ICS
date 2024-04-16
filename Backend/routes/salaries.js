const express = require("express");
const {
  createSalary,
  getSalaries,
  getSalary,
  deleteSalary,
  updateSalary,
} = require("../controllers/salaryController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

// GET all workouts
router.get("/", authMiddleware([USER_ROLES.USER_MANAGER]), getSalaries);

// GET a single workout
router.get("/:id", authMiddleware([USER_ROLES.USER_MANAGER]), getSalary);

// POST a new workout
router.post("/", authMiddleware([USER_ROLES.USER_MANAGER]), createSalary);

// DELETE a workout
router.delete("/:id", authMiddleware([USER_ROLES.USER_MANAGER]), deleteSalary);

// UPDATE a workout
router.put("/:id", authMiddleware([USER_ROLES.USER_MANAGER]), updateSalary);

module.exports = router;
