const mongoose=require('mongoose')

const Schema=mongoose.Schema

const exportSchema=new Schema({

    exportOrderID:{
        type:String,
        required:true
    },
    importer:{
        type:String,
        required:true
    },
    itemID:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }, 
    totalCost:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    }
},{timestamps:true})


module.exports=mongoose.model('Export',exportSchema)
