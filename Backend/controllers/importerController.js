const Importer=require('../models/importerModel')
const mongoose=require('mongoose')

//get all importers
const getImporters=async(req,res)=>{
    const importer=await Importer.find({}).sort({createdAt: -1})

    res.status(200).json(importer)
}

//get a single importer
const getImporter=async(req,res)=>{
    const { id }=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such importer'})
    }

    const importer=await Importer.findById(id)

    if(!importer){
        return res.status(404).json({error:'No such importer'})
    }

    res.status(200).json(importer)
}

//create new importer
const createImporter=async(req,res)=>{
    const{importerID, importerName, address, contactNumber, email}=req.body

    let emptyFields=[]

    if(!importerID){
        emptyFields.push('importerID')
    }
    if(!importerName){
        emptyFields.push('importerName')
    }
    if(!address){
        emptyFields.push('address')
    }
    if(!contactNumber){
        emptyFields.push('contactNumber')
    }
    if(!email){
        emptyFields.push('email')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all the fields!',emptyFields})
    }

    //add doc to db
    try{
        const importer=await Importer.create({importerID, importerName, address, contactNumber, email})
        res.status(200).json(importer)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a importer
const deleteImporter=async(req,res)=>{
    const { id }=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such importer'})
    }

    const importer=await Importer.findOneAndDelete({_id:id})

    if(!importer){
        return res.status(404).json({error:'No such importer'})
    }

    res.status(200).json(importer)
}

//update a importer
const updateImporter=async(req,res)=>{
    const { id }=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such importer'})
    }

    const importer=await Importer.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!importer){
        return res.status(404).json({error:'No such importer'})
    }

    res.status(200).json(importer)
}

module.exports={
    getImporters,
    getImporter,
    createImporter,
    deleteImporter,
    updateImporter
}