const express = require('express');
const {
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require("../controllers/userController");

const router = express.Router();

// GET all users
router.get('/', getUsers);

// GET a single user
router.get('/:id', getUser);

// DELETE a user
router.delete('/:id', deleteUser);

// UPDATE a user
router.put('/:id', updateUser);

module.exports = router;
