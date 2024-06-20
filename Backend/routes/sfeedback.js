const express = require('express');
const router = express.Router();
const Feedback = require('../models/sfeedbackModel'); // Adjust the path as needed


//add sales feedback
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

//delete feedback
router.delete('/dsf/:id', async function (req, res) {
    try {
        const id = req.params.id;
        console.log('Deleting feedback:', id);

        const deletefeedback = await Feedback.findByIdAndDelete(id);
        if (deletefeedback) {
            console.log('Feedback deleted:', deletefeedback);
            res.status(200).send({ status: 'Feedback deleted' });
        } else {
            console.log('Feedback not found');
            res.status(404).send({ error: 'Feedback not found' });
        }
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).send({ error: 'Server error' });
    }
});




module.exports = router;