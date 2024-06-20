const express=require('express')
const {
    createImporter,
    getImporters,
    getImporter,
    deleteImporter,
    updateImporter
}=require('../controllers/importerController')

const router=express.Router()

//GET all importers
router.get('/',getImporters)

//GET a single importer
router.get('/:id',getImporter)

//POST a new importer
router.post('/',createImporter)

//DELETE an importer
router.delete('/:id',deleteImporter)

//UPDATE a importer
router.put('/:id',updateImporter)

module.exports=router