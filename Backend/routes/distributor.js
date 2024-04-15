const express = require('express')
const router = express.Router()
//controller functions
const { signupDistributor, loginDistributor } = require('../controllers/distributorController');


//login route
router.post('/login',loginDistributor)

//signup route
router.post('/signup',signupDistributor)



module.exports = router