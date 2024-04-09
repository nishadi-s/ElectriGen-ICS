const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const dFeedbackSchema = new Schema({
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

const dFeedback = mongoose.model("dFeedback",dFeedbackSchema);
module.exports = dFeedback;