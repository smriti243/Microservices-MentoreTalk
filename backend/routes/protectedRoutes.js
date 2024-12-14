const express = require('express');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Example protected route
router.get('/profile', protect, (req, res) => {
  res.json({
    status: 'success',
    data: {
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
      }
    }
  });
});

// Add more protected routes here
router.get('/feed', protect, (req, res) => {
  // Implement feed logic here
  res.json({ status: 'success', message: 'Feed data' });
});

router.get('/mentors', protect, (req, res) => {
  // Implement mentors list logic here
  res.json({ status: 'success', message: 'Mentors list' });
});

module.exports = router;