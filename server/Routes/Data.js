import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Note from '../Models/AddData.js';
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// This route is for save the user data
router.post("/add", async (req, res) => {
    const { name, contact, grade, course } = req.body;
    console.log(req.body);
    try {
        const note = new Note({
            name: name,
            grade: grade,
            contact: contact,
            course: course,
        });
        await note.save();
        res.status(200).json({ message: "Note added successfully", note, success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// This route is for get all the user data

router.get("/get", async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({ message: "Note fetched successfully", notes, success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// This route is for delete the user data
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findByIdAndDelete(id);
        res.status(200).json({ message: "Note deleted successfully", note, success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
// This route is for update the user data
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, grade, contact, course } = req.body;
    try {
        const note = await Note.findByIdAndUpdate(id, {
            name: name,
            grade: grade,
            contact: contact,
            course: course,
        }, { new: true });
        res.status(200).json({ message: "Note updated successfully", note, success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
)

export default router;