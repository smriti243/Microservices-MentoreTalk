const express = require('express');
const authController = require('../controllers/authController'); // Ensure the path is correct

const router = express.Router();

router.post('/signup', authController.signup); // Make sure `signup` function exists in authController
router.post('/login', authController.login); // Make sure `login` function exists in authController

module.exports = router;
