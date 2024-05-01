const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const sfeedbackSchema = new Schema({
    name: {
        
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }

})

const sfeedback = mongoose.model("Sfeedback",sfeedbackSchema);
module.exports = sfeedback;