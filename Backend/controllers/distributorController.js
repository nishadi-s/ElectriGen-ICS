const DistributorDin = require('../models/distributorModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_DIS, { expiresIn: '3d'})
}

//login distributor
const loginDistributor = async (req,res) => {

    const {email, password} = req.body

    try{
        const distributor = await DistributorDin.login(email, password)

        //create a token
        const token = createToken(distributor._id)

        res.status(200).json({email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//signup distributor
const signupDistributor = async (req,res) => {
    const{email,password} = req.body

    try{
        const distributor = await DistributorDin.signup(email, password)

        //create a token
        const token = createToken(distributor._id)

        res.status(200).json({email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { signupDistributor,loginDistributor } 