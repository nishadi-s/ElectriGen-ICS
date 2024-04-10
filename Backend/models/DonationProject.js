const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({ 
    project_id: {
        type: Number, // Use Number for integer values
        required: true
    },
    description: {
        type: String,
        required: true
    },
    estimate_date: {
        type: Date, // Use Date for date values
        required: true
    },
    total_amount: {
        type: Number, // Use Number or Decimal for floating-point numbers
        required: true
    }
    
})

const Project = mongoose.model('Project', projectSchema); // Capitalize model name

module.exports = Project;
