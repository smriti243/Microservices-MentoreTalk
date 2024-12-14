const express = require('express');
const {
  sendConnectionRequest,
  acceptConnectionRequest,
  getConnectionStatus,
  removeConnection,
} = require('../controllers/connectionController');

const router = express.Router();

// Connection routes
router.post('/connect-request', sendConnectionRequest); // Send a connection request
router.post('/accept-request', acceptConnectionRequest); // Accept a connection request
router.get('/connection-status/:mentorId', getConnectionStatus); // Get connection status with a mentor
router.post('/remove-connection', removeConnection); // Remove a connection

module.exports = router;
