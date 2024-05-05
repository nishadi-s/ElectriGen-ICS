const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productionSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    materials: [
      {
        materialName: {
          type: String,
          required: true,
        },
        materialNo: {
          type: String,
          required: true,
        },
        materialQuantity: {
          type: String,
          required: true,
        },
      },
    ],
    products: [
      {
        name: {
          type: String,
          required: true,
        },
        itemCode: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Production", productionSchema);
