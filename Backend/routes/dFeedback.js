const express = require('express');
const router = express.Router();
const Feedback = require('../models/dFeedbackModel'); // Adjust the path as needed


//add donation feedback
router.post('/addf', async (req, res) => {
    try {
        const { name, phone, message } = req.body;
        const newFeedback = new Feedback({ name, phone, message });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback added successfully' });
    } catch (error) {
        console.error('Error adding feedback:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//get all feedback
router.get('/getAllf', async (req, res) => {
    try {
        const allFeedbacks = await Feedback.find();
        res.status(200).json(allFeedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;