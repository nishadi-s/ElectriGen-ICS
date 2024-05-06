const express = require("express");
const {
  createSalary,
  getSalaries,
  getSalary,
  deleteSalary,
  updateSalary,
} = require("../controllers/salaryController");

const router = express.Router();

// GET all workouts
router.get("/", getSalaries);

// GET a single workout
router.get("/:id", getSalary);

// POST a new workout
router.post("/", createSalary);

// DELETE a workout
router.delete("/:id", deleteSalary);

// UPDATE a workout
router.put("/:id", updateSalary);

module.exports = router;
