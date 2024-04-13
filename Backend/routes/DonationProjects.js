const express = require('express');
const router = express.Router();
const Project = require('../models/DonationProject');

// Middleware to parse JSON requests
router.use(express.json());

router.route("/add").post(async (req, res) => {
    try {
        // Extract fields including items array from the request body
        const { project_id, estimate_date, description, total_amount, items } = req.body;

        // Create a new Project instance with all details
        const newProject = new Project({
            project_id,
            estimate_date,
            description,
            total_amount,
            items,
        });

        // Save the new Project to the database
        await newProject.save();
        res.status(201).json({ status: "Project saved successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save project" });
    }
});

router.route("/").get(async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

router.route("/delete/:project_id").delete(async (req, res) => {
    const projectId = req.params.project_id;

    try {
        // Find the project by its project ID and delete it from the database
        const deletedProject = await Project.findOneAndDelete({ project_id: projectId });

        if (!deletedProject) {
            // If the project with the specified project ID is not found, return a 404 status
            return res.status(404).json({ error: "Project not found" });
        }

        // If the project is successfully deleted, return a success message
        res.status(200).json({ status: "Project deleted successfully" });
    } catch (err) {
        // If an error occurs during the delete process, return a 500 status with an error message
        console.error(err);
        res.status(500).json({ error: "Failed to delete project" });
    }
});


router.route("/update/:project_id").put(async (req, res) => {
    const projectId = req.params.project_id;
    const { description, estimate_date, total_amount, items } = req.body;

    try {
        // Find the project by its project ID and update its details
        const updatedProject = await Project.findOneAndUpdate(
            { project_id: projectId }, // Query based on project_id
            { description, estimate_date, total_amount, items }, // Update the project details
            { new: true } // Return the updated document
        );

        if (!updatedProject) {
            // If the project with the specified project ID is not found, return a 404 status
            return res.status(404).json({ error: "Project not found" });
        }

        // If the project is successfully updated, return a success message along with the updated project
        res.status(200).json({ status: "Project updated successfully", project: updatedProject });
    } catch (err) {
        // If an error occurs during the update process, return a 500 status with an error message
        console.error(err);
        res.status(500).json({ error: "Failed to update project" });
    }
});




module.exports = router;
