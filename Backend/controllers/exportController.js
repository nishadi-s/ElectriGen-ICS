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
    const{exportOrderID, importer, items, totalCost, status}=req.body

    let emptyFields=[]

    if(!exportOrderID){
        emptyFields.push('exportOrderID')
    }
    if(!importer){
        emptyFields.push('importer')
    }
    if (!items || !items.length) {
        emptyFields.push('items');

    } else {
        for (const item of items) {
            if (!item.itemID || !item.quantity) {
                emptyFields.push('items');
                break;
            }
        }
    }
    if(!totalCost){
        emptyFields.push('totalCost')
    }
    if(!status){
        emptyFields.push('status')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all the fields!',emptyFields})
    }

    //add doc to db
    try{
        const exportt=await Export.create({exportOrderID, importer, items, totalCost, status})
        res.status(200).json(exportt)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete an export
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

//update an export
const updateExport=async(req,res)=>{
    const { id }=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such export'})
    }

    try {
        const exportt = await Export.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true }); // Add { new: true } to return the updated document

        if (!exportt) {
            return res.status(400).json({ error: 'No such order' });
        }

        res.status(200).json(exportt);
    } catch (error) {
        console.error('Error updating export:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//     const exportt=await Export.findOneAndUpdate({_id:id},{
//         ...req.body
//     })

//     if(!exportt){
//         return res.status(404).json({error:'No such export'})
//     }

//     res.status(200).json(exportt)
// }

module.exports={
    getExports,
    getExport,
    createExport,
    deleteExport,
    updateExport
}