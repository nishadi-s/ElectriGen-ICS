const express = require('express');
const router = express.Router();
const requireDisDAuth = require('../middleware/requireDisDAuth'); // Import the middleware
const { signupDistributor, loginDistributor, getDistributorProfile } = require('../controllers/distributorController');

// Login route
router.post('/login', loginDistributor);

// Signup route
router.post('/signup', signupDistributor);

module.exports = router;