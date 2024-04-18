const express = require('express');
const router = express.Router();
const {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder,
    getManagerOrders,
    updateManagerOrder,
    getManagerOrder
} = require('../controllers/orderController.js');

const requireDisDAuth = require('../middleware/requireDisDAuth');

router.use((req, res, next) => {
    if ((req.path === '/manager/orders' || req.path === '/manager/orders/:id') && req.method === 'GET') {
        // Skip authentication for getManagerOrders route
        return next();
    }
    if ((req.path === '/manager/orders/:id') && req.method === 'PUT') {
        // Skip authentication for updateManagerOrder route
        return next();
    }
    if ((req.path === '/manager/orders/:id') && req.method === 'GET') {
        // Skip authentication for getManagerOrder route
        return next();
    }
    requireDisDAuth(req, res, next);
});

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

//dis manager
router.get('/manager/orders', getManagerOrders); // Route for managers

router.get('/manager/orders/:id', getManagerOrder); // Route for managers

router.put('/manager/orders/:id', updateManagerOrder); // Route for managers


module.exports = router;