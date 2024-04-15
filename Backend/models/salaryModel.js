const mongoose = require('mongoose');

// Define schema for Manager and Salary
const managerSalarySchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    // Salary details
    base: {
        type: Number,
        required: true
    },
    otRate: {
        type: Number,
        default: 1.5 // Default overtime rate as 1.5 times the base salary
    },
    otHours: {
        type: Number,
        default: 0 // Default overtime hours
    },
        bonus: {
            type: Number,
            required: true
        },
  
    reason: {
        type: String,
        required: true
    },
    // Final salary calculated after considering base salary, overtime, and bonuses
    finalSal: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Create model
const ManagerSalary = mongoose.model('ManagerSalary', managerSalarySchema);

module.exports = ManagerSalary;
