const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

// Use GET for fetching profile data
router.get('/profile', protect, getProfile);

// Use PUT for updating profile data
router.put('/profile', protect, updateProfile);

module.exports = router;
