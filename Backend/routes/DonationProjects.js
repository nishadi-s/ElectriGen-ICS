const express = require("express");
const router = express.Router();
const Project = require("../models/DonationProject");

// Middleware to parse JSON requests
router.use(express.json());

router.route("/add").post(async (req, res) => {
    try {
        console.log(req.body); // Check the request body

        // Check if request body contains expected properties
        if (!req.body.project_id || !req.body.description || !req.body.estimate_date || !req.body.total_amount) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Parse project_id and total_amount to numbers
        const project_id = parseInt(req.body.project_id);
        const total_amount = parseFloat(req.body.total_amount);

        // Extract fields from request body
        const { description, estimate_date } = req.body;

        // Create a new Project instance
        const newProject = new Project({
            project_id,
            description,
            estimate_date,
            total_amount
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

router.route("/update/:project_id").put(async (req, res) => {
    const project_id = req.params.project_id;
    const { description, estimate_date, total_amount } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            project_id,
            { description, estimate_date, total_amount },
            { new: true } // Return the updated document
        );

        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json({ status: "Successfully updated", project: updatedProject });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update project" });
    }
});


router.route("/delete/:project_id").delete(async (req, res) => {
    const project_id = req.params.project_id;

    try {
        const deletedProject = await Project.findByIdAndDelete(project_id);

        if (!deletedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json({ status: "Project deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete project" });
    }
});

router.route("/get/:project_id").get(async (req, res) => {
    const project_id = req.params.project_id;

    try {
        const project = await Project.findById(project_id);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json({ status: "Project fetched", project });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch project" });
    }
});


module.exports = router;
