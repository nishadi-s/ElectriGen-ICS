const Supplier_order = require('../models/supplier_orderModel');
const mongoose = require('mongoose');

// Get all orders
const getOrders = async (req, res) => {
    try {
        const supOrders = await Supplier_order.find({}).sort({ createdAt: -1 });
        res.status(200).json(supOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a single order
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such Order' });
        }

        const supOrder = await Supplier_order.findById(id);
        if (!supOrder) {
            return res.status(404).json({ error: 'No such Order' });
        }
        res.status(200).json(supOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create new order
const createOrder = async (req, res) => {
    const { Sup_Ord_id, Sup_ID, items, Sup_orded_date, Sup_recpt_date, Sup_Ord_sts, Sup_rating } = req.body;
    
    let emptyFields = []

    if(!Sup_Ord_id){
         emptyFields.push ('Supplier Order ID ')
    }

    if(!Sup_ID){
        emptyFields.push ('Supplier ID ')
   }

   if(!items){
    emptyFields.push ('Supplier Order items ')
}





if(!Sup_orded_date){
    emptyFields.push ('Supplier Order Ordered Date ')
}

if(!Sup_recpt_date){
    emptyFields.push ('Supplier Order Received Date ')
}

if(!Sup_Ord_sts){
    emptyFields.push ('Supplier Order Status ')
}

if(!Sup_rating){
    emptyFields.push ('Supplier Order Rating ')
}

if(emptyFields.length > 0){
    return res.status(400).json ({error: 'Please fill in all the fields' , emptyFields})
}

 
    //add doc to DataBase
    try {
        const order = await Supplier_order.create({ Sup_Ord_id, Sup_ID, items, Sup_orded_date, Sup_recpt_date, Sup_Ord_sts, Sup_rating });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//delete a product
const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' });
    }

    try {
        const order = await Supplier_order.findOneAndDelete({ _id: id });

        if (!order) {
            return res.status(404).json({ error: 'No such product' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update the order
const updateOrder = async (req, res) => {
    const { id } = req.params; // Extract id from request params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Order' });
    }

    try {
        // Find the supplier by id and update its fields with the data from req.body
        const order = await Supplier_order.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (!order) {
            return res.status(404).json({ error: 'No such Order' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    deleteOrder,
    updateOrder,
};