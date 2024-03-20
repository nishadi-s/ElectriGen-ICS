const Export=require('../models/exportModel')
const mongoose=require('mongoose')

//get all exports
const getExports=async(req,res)=>{
    const exports=await Export.find({}).sort({createdAt: -1})

    res.status(200).json(exports)
}

//get a single export
const getExport=async(req,res)=>{
    const { id }=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such export'})
    }

    const exportt=await Export.findById(id)

    if(!exportt){
        return res.status(404).json({error:'No such export'})
    }

    res.status(200).json(exportt)
}

//create new export
const createExport=async(req,res)=>{
    const{exportOrderID, importer, itemID, quantity, status}=req.body

    //add doc to db
    try{
        const exportt=await Export.create({exportOrderID, importer, itemID, quantity, status})
        res.status(200).json(exportt)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a export
const deleteExport=async(req,res)=>{
    const { id }=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such export'})
    }

    const exportt=await Export.findOneAndDelete({_id:id})

    if(!exportt){
        return res.status(404).json({error:'No such export'})
    }

    res.status(200).json(exportt)
}

//update a export
const updateExport=async(req,res)=>{
    const { id }=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such export'})
    }

    const exportt=await Export.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!exportt){
        return res.status(404).json({error:'No such export'})
    }

    res.status(200).json(exportt)
}

module.exports={
    getExports,
    getExport,
    createExport,
    deleteExport,
    updateExport
}