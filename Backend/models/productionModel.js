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
        productName: {
          type: String,
          required: true,
        },
        productNo: {
          type: String,
          required: true,
        },
        colors: [
          {
            colorName: {
              type: String,
              required: true,
            },
            usableQty: {
              type: Number,
              required: true,
            },
            damagedQty: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Production", productionSchema);
