const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

// Define the schema for distributors
const distributorSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

//static signup method
distributorSchema.statics.signup = async function (email, password) {

    //validation
    if(!email||!password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Passsword is not strong enough')
    }


    // Moved the code inside the async function
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const distributor = await this.create({ email, password: hash });
    return distributor;
};

//static login method
distributorSchema.statics.login = async function (email, password) {
    if(!email||!password){
        throw Error('All fields must be filled')
    }

    const distributor = await this.findOne({ email });

    if (!distributor) {
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, distributor.password)
    if(!match){
        throw Error('Incorrect password');
    }

    return distributor

}


module.exports = mongoose.model('DistributorDin', distributorSchema);