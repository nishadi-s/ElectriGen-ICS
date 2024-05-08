const express = require('express');
const {
    createSupplier,
    getSuppliers,
    getSupplierById,
    deleteSupplier,
    updateSupplier ,
} = require ('../controllers/supplierController')
const router = express.Router();

// Get all suppliers
router.get('/', getSuppliers);

// Get a single supplier
router.get('/:id', getSupplierById );

// POST a new supplier
router.post('/', createSupplier);

// DELETE a single supplier
router.delete('/:id', deleteSupplier)

// UPDATE a supplier 
router.put('/:id',updateSupplier)

module.exports = router;
