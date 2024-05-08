const Material = require("../models/materialModel");
const mongoose = require("mongoose");

//get all material
const getMaterials = async (req, res) => {
  const materials = await Material.find({}).sort({ createdAt: -1 });

  res.status(200).json(materials);
};

//get a single material
const getMaterial = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such material" });
  }

  const material = await Material.findById(id);

  if (!material) {
    return res.status(404).json({ error: "No such material" });
  }

  res.status(200).json(material);
};

//ceate new material
const createMaterial = async (req, res) => {
  const { name, code, unitPrice, quantity } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!code) {
    emptyFields.push("code");
  }
  if (!unitPrice) {
    emptyFields.push("unitPrice");
  }
  if (!quantity) {
    emptyFields.push("quantity");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });
  }

  //add doc to db
  try {
    const material = await Material.create({
      name,
      code,
      unitPrice,
      quantity,
    });
    res.status(200).json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a material
const deleteMaterial = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such material" });
  }

  const material = await Material.findOneAndDelete({ _id: id });

  if (!material) {
    return res.status(404).json({ error: "No such material" });
  }

  res.status(200).json(material);
};

// update a material
const updateMaterial = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "There is no such material" });
  }

  try {
    const updatedMaterial = await Material.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body, // Update with request body
      },
      { new: true }
    ); // return the updated document

    if (!updatedMaterial) {
      return res.status(404).json({ error: "No such material" });
    }

    res.status(200).json(updatedMaterial);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMaterialByItemCode = async (req, res) => {
  const { code } = req.params;

  try {
    const material = await Material.findOne({ code });

    if (!material) {
      return res
        .status(404)
        .json({ error: "No material found with the provided item code" });
    }

    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getMaterial,
  getMaterials,
  createMaterial,
  deleteMaterial,
  updateMaterial,
  getMaterialByItemCode,
};
