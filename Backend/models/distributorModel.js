const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

// Define the schema for distributors
const distributorSchema = new Schema({
    distributorName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    distributorLoginID: {
        type: String,
        required: true,
    },
});

// Static signup method
distributorSchema.statics.signup = async function ({ distributorName, address, companyName, email, password, distributorLoginID }) {
    // Validation
    if (!email || !password || !distributorName || !address || !companyName || !distributorLoginID) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    // Moved the code inside the async function
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const distributor = await this.create({ distributorName, address, companyName, email, password: hash, distributorLoginID });
    return distributor;
};

// Static login method
distributorSchema.statics.login = async function (distributorLoginID, password) {
    if (!distributorLoginID || !password) {
        throw Error('All fields must be filled');
    }
    const distributor = await this.findOne({ distributorLoginID });
    if (!distributor) {
        throw Error('Incorrect email');
    }
    const match = await bcrypt.compare(password, distributor.password);
    if (!match) {
        throw Error('Incorrect password');
    }
    return distributor;
};

module.exports = mongoose.model('DistributorDin', distributorSchema);