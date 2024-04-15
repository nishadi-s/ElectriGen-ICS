const Production = require("../models/productionModel");
const mongoose = require("mongoose");

// Get all productions
const getProductions = async (req, res) => {
  try {
    const productions = await Production.find({}).sort({ createdAt: -1 });
    res.status(200).json(productions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single production
const getProduction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such production" });
  }

  try {
    const production = await Production.findById(id);
    if (!production) {
      return res.status(404).json({ error: "No such production" });
    }
    res.status(200).json(production);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new production
const createProduction = async (req, res) => {
  const { date, materials, products } = req.body;

  try {
    const production = await Production.create({
      date,
      materials,
      products,
    });

    // Update product quantities based on production
    await updateProductQuantities(products);

    res.status(200).json(production);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a production
const deleteProduction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such production" });
  }

  try {
    const production = await Production.findOneAndDelete({ _id: id });
    if (!production) {
      return res.status(404).json({ error: "No such production" });
    }
    res.status(200).json(production);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a production
const updateProduction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such production" });
  }

  try {
    const updatedProduction = await Production.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    // Update product quantities based on updated production
    await updateProductQuantities(updatedProduction.products);

    if (!updatedProduction) {
      return res.status(404).json({ error: "No such production" });
    }
    res.status(200).json(updatedProduction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to update product quantities based on production
const updateProductQuantities = async (products) => {
  // Implement logic to update product quantities here
};

module.exports = {
  getProductions,
  getProduction,
  createProduction,
  deleteProduction,
  updateProduction,
};
