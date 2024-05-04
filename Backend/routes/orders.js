const express = require('express');
const router = express.Router();
const {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder,
} = require('../controllers/orderController.js');

// Establishing routes to manage orders

// GET all orders
router.get('/', getOrders);

// GET a single order
router.get('/:id', getOrder);

// POST a new order
router.post('/', createOrder);

// DELETE an order
router.delete('/:id', deleteOrder);

// UPDATE an order
router.put('/:id', updateOrder);

module.exports = router;