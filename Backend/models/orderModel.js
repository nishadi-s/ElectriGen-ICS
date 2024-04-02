const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    distributorId: {
        type: String,
        required: true
    },
    distributorName: {
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
/*
    item1_code: {
        type: String,
        required: true
    },
    item1_name: {
        type: String,
        required: true
    },
    item1_quantity: {
        type: Number,
        required: true
    },

    item2_code: {
        type: String,
        required: true
    },
    item2_name: {
        type: String,
        required: true
    },
    item2_quantity: {
        type: Number,
        required: true
    },

    item3_code: {
        type: String,
        required: true
    },
    item3_name: {
        type: String,
        required: true
    },
    item3_quantity: {
        type: Number,
        required: true
    },
    */

    orderStatus: {
        type: String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model('Order', orderSchema)
