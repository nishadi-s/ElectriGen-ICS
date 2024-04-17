const DistributorDin = require('../models/distributorModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_DIS, { expiresIn: '10d'});
};

// Login distributor
const loginDistributor = async (req, res) => {
    const { email, password } = req.body;

    try {
        const distributor = await DistributorDin.login(email, password);
        const token = createToken(distributor._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Signup distributor
const signupDistributor = async (req, res) => {
    const { distributorName, address, companyName, email, password } = req.body;

    try {
        const distributor = await DistributorDin.signup({ distributorName, address, companyName, email, password });
        const token = createToken(distributor._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupDistributor, loginDistributor,};