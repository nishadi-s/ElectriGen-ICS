const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item: String,
    qty: Number,
    unitPrice: Number,
});

const projectSchema = new Schema({ 
    project_id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    estimate_date: {
        type: Date,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    items: [itemSchema], // Array of items
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
