const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Define the schema for distributors
const distributorSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Distributor', distributorSchema) 
                               /*mongodb document
                                name*/