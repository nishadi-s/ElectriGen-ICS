//IT22227904-dinithi-Distribution Management Function

const Order = require('../models/orderModel.js') // Importing the Order model
const mongoose = require('mongoose') //data is coming from mongoDB

//get all orders
const getOrders = async(req,res) => {
        const orders = await Order.find({}).sort({ createdAt: -1 }); // Fetch all orders and sort by createdAt

        return res.status(200).json(orders); // Return the orders
}

//get a single order
const getOrder = async(req,res) => {
    const { id } = req.params // Extract the order ID from request parameters

    if(!mongoose.Types.ObjectId.isValid(id)){  // Check if the ID is valid
        return res.status(404).json({error:'No such order'}) // Return error if ID is not valid
    }

    const order = await Order.findById(id)  // Find order by ID

    if(!order){ // If order not found
        return res.status(404).json({error: 'no such order'})
    }

    res.status(200).json(order) // Return the order
}


//create new order
const createOrder = async (req,res) => {
    const {distributorId,distributorName,orderStatus,items,totalAmount} = req.body // Destructure request body

    let emptyFields = [] // Array to store empty field names
    
    // Check for empty required fields
    if(!distributorId) {
        emptyFields.push('distributorId')
    }
    if(!distributorName) {
        emptyFields.push('distributorName')
    }
    if (!items || items.length === 0) {
        emptyFields.push('items');
    } else {
        // Check each item in the array
        items.forEach((item, index) => {
            if (!item.code || !item.name || !item.unit || !item.quantity) {
                emptyFields.push(`Item at index ${index} is missing required fields (code, name, quantity)`);
            }
        });
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please Fill In All The Fields!', emptyFields })
    }


    // Add new order document to the database
    try{
        const newOrder = await Order.create({distributorId,distributorName,orderStatus,items,totalAmount})
        res.status(200).json(newOrder) // Return the new order
    }catch(error){
        res.status(400).json({error: error.message}) // Return error if creation fails
    }
}

//delete an order
const deleteOrder = async (req,res) => {
    const { id } = req.params // Extract the order ID from request parameters

    if(!mongoose.Types.ObjectId.isValid(id)){ // Check if the ID is valid
        return res.status(404).json({error:'Invalid order ID'})
    }

    const deletedOrder  = await Order.findOneAndDelete({_id: id}) // Find and delete order by ID

    if(!deletedOrder){
        return res.status(400).json({error: 'Order not found'})
    }

    res.status(200).json(deletedOrder) // Return the deleted order
}


//update an order
const updateOrder = async (req, res) => {
    const { id } = req.params; // Extract the order ID from request parameters

    if (!mongoose.Types.ObjectId.isValid(id)) { // Check if the ID is valid
        return res.status(404).json({ error: 'No such order' });
    }

    try {
        const updatedOrder = await Order.findOneAndUpdate({ _id: id }, {
            ...req.body // Update with request body
        }, { new: true }); // return the updated document

        if (!updatedOrder) { // If order not found
            return res.status(400).json({ error: 'No such order' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder
}