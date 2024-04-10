const express=require('express')
const {
    createExport,
    getExports,
    getExport,
    deleteExport,
    updateExport
}=require('../controllers/exportController')

const router=express.Router()

//GET all exports
router.get('/',getExports)

//GET a single export
router.get('/:id',getExport)

//POST a new export
router.post('/',createExport)

//DELETE an export
router.delete('/:id',deleteExport)

//UPDATE a export
router.patch('/:id',updateExport)

module.exports=router