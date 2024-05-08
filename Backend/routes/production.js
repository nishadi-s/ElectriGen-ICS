const express = require("express");
const Production = require("../models/productionModel");
const {
  createProduction,
  getProductions,
  getProduction,
  updateProduction,
  deleteProduction,
} = require("../controllers/productionController");

const router = express.Router();

//GET all production records
router.get("/", getProductions);

//GET a single production record
router.get("/:id", getProduction);

//POST a new production record
router.post("/", createProduction);

//DELETE a production record
router.delete("/:id", deleteProduction);

//UPDATE a production record
router.put("/:id", updateProduction);

module.exports = router;
