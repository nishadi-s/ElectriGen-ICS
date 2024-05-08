const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const supplier_orderSchema =  new Schema({

    Sup_Ord_id: {
        type:String,
        required: true
    },
    Sup_ID: {
        type:String,
        required:true
    },

    items: [
        {
            
            Sup_matrial_code: String,
            M_Name:String ,
            Sup_Quant:Number
           
            
                
            
        }
    ],
    
   

    Sup_orded_date:{
        type:String,
        required:true
    },

    Sup_recpt_date:{
        type:String,
        required:true
    },

    Sup_Ord_sts:{
        type:String,
        required:true
    },

    // Rating using stars (1 to 5 stars)
    Sup_rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0 // Default rating if not provided
    }
}, {timestamps: true})

module.exports = mongoose.model('Supplier_Order',supplier_orderSchema)