const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const auth = require('../middlewares/authMiddleware');

module.exports = (upload, db) => {
  // Upload a resume
  router.post('/upload', auth, upload.single('resume'), resumeController.uploadResume);

  // Get all resumes
  router.get('/', auth, resumeController.getResumes);

  // Get a specific resume
  router.get('/:id', auth, resumeController.getResumeDetails);

  // Add a comment to a resume
  router.post('/:id/comment', auth, resumeController.addComment);

  // Get the resume file
  router.get('/file/:filename', auth, resumeController.getResumeFile(db));

  return router;
};