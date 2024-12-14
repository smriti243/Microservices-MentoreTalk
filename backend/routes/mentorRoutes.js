const express = require('express');
const mentorController = require('../controllers/mentorController'); // Ensure this path is correct

const router = express.Router();

// Route for fetching all mentors
router.get('/', mentorController.getAllMentors);

// Routes for a specific mentor
router.get('/:id', mentorController.getMentorById);
router.patch('/:id', mentorController.updateMentor);
router.delete('/:id', mentorController.deleteMentor);

// Route to add a new mentor session

module.exports = router;
