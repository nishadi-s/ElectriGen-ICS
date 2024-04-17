const Product = require("../models/productModel");
const mongoose = require("mongoose");

//get all products
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(products);
};

//get a single product
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such product" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

//ceate new product
const createProduct = async (req, res) => {
  const { name, itemCode, unitPrice, quantity, color, category } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!itemCode) {
    emptyFields.push("itemCode");
  }
  if (!unitPrice) {
    emptyFields.push("unitPrice");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!color) {
    emptyFields.push("color");
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
    const product = await Product.create({
      name,
      itemCode,
      unitPrice,
      quantity,
      color,
      category,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such product" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

// update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "There is no such product" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body, // Update with request body
      },
      { new: true }
    ); // return the updated document

    if (!updatedProduct) {
      return res.status(404).json({ error: "No such Product" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};