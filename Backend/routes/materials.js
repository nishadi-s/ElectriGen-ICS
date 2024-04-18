const express = require("express");
const Material = require("../models/materialModel");
const {
  createMaterial,
  getMaterials,
  getMaterial,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/materialController");

const router = express.Router();

//GET all materials
router.get("/", getMaterials);

//GET a single material
router.get("/:id", getMaterial);

//POST a new materials
router.post("/", createMaterial);

//DELETE a materials
router.delete("/:id", deleteMaterial);

//UPDATE a materials
router.put("/:id", updateMaterial);

module.exports = router;