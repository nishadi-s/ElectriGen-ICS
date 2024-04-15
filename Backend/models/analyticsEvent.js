const mongoose = require('mongoose');

const exportOrderSchema = new mongoose.Schema({
  exportOrderID: String,
  importer: String,
  items: [{ itemID: String, quantity: Number }],
  totalCost: Number,
  status: String
});

const ExportOrder = mongoose.model('ExportOrder', exportOrderSchema);

module.exports = ExportOrder;
