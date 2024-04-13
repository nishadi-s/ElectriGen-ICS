const Distributor = require('../models/distributorModel')

//login distributor
const loginDistributor = async (req,res) => {
    res.json({mssg: 'login user'})
}

//signup distributor
const signupDistributor = async (req,res) => {
    res.json({mssg: 'signup user'})
}

module.exports = { signupDistributor,loginDistributor }