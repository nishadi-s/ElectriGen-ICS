const mongoose=require('mongoose')

const Schema=mongoose.Schema

const importerSchema=new Schema({

    importerID:{
        type:String,
        required:true
    },
    importerName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('Importer',importerSchema)
