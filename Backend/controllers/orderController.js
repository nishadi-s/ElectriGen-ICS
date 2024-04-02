const Order = require('../models/orderModel.js') // Rename the variable
const mongoose = require('mongoose')

//get all orders
const getOrders = async(req,res) => {
        const orders = await Order.find({}).sort({ createdAt: -1 });

        return res.status(200).json(orders);
}

//test commit
//get a single order
const getOrder = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such order'})
    }

    const order = await Order.findById(id)

    if(!order){
        return res.status(404).json({error: 'no such order'})
    }

    res.status(200).json(order)
}


//create new order
const createOrder = async (req,res) => {
    const {distributorId,distributorName,items,orderStatus} = req.body

    let emptyFields = []
    
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
            if (!item.code || !item.name || !item.quantity) {
                emptyFields.push(`Item at index ${index} is missing required fields (code, name, quantity)`);
            }
        });
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please Fill In All The Fields!', emptyFields })
    }


    //add doc to db
    try{
        const newOrder = await Order.create({distributorId,distributorName,items,orderStatus})
        res.status(200).json(newOrder)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete an order
const deleteOrder = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Invalid order ID'})
    }

    const deletedOrder  = await Order.findOneAndDelete({_id: id})

    if(!deletedOrder){
        return res.status(400).json({error: 'Order not found'})
    }

    res.status(200).json(deletedOrder)
}


//update an order
const updateOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such order' });
    }

    try {
        const updatedOrder = await Order.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true }); // Add { new: true } to return the updated document

        if (!updatedOrder) {
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