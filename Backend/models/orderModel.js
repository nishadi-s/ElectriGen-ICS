const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Define the schema for orders
const orderSchema = new Schema({
    distributorId: {
        type: String,
        required: true
    },
    distributorName: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },

    //items array
    items:[
        {
            code: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            unit: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },
        {
            code: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },
        {
            code: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

},{timestamps:true}) // Add timestamps for createdAt and updatedAt fields

module.exports = mongoose.model('Order', orderSchema) // Export the Order model
