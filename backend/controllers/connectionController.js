const Mentor = require('../models/Mentor');
const User = require('../models/User');

// Send a connection request from user to mentor
exports.sendConnectionRequest = async (req, res) => {
  try {
    const { mentorId } = req.body;
    const userId = req.user._id;

    const mentor = await User.findById(mentorId);
    const user = await User.findById(userId);

    if (!mentor || !user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Mentor or user not found',
      });
    }

    // Check if the user already has a pending request or is already connected
    if (mentor.pendingRequests.includes(userId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Connection request already sent',
      });
    }

    if (mentor.connections.includes(userId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Already connected with this mentor',
      });
    }

    // Add the user's request to the mentor's pending requests
    mentor.pendingRequests.push(userId);
    await mentor.save();

    // Add the mentor to the user's pending requests as well
    user.pendingRequests.push(mentorId);
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Connection request sent successfully',
    });
  } catch (error) {
    console.error('Error in sending connection request:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again later.',
    });
  }
};

// Accept a connection request (mentor accepts a student's request)
exports.acceptConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.body; // The user that sent the request
    const mentorId = req.user._id; // The mentor who is accepting the request

    const mentor = await User.findById(mentorId);
    const user = await User.findById(userId);

    if (!mentor || !user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Mentor or user not found',
      });
    }

    // Check if the user actually requested a connection
    if (!mentor.pendingRequests.includes(userId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'No connection request from this user',
      });
    }

    // Add the user to the mentor's connections and remove from pending
    mentor.connections.push(userId);
    mentor.pendingRequests = mentor.pendingRequests.filter(reqId => reqId.toString() !== userId);
    await mentor.save();

    // Add the mentor to the user's connections and remove from pending
    user.connections.push(mentorId);
    user.pendingRequests = user.pendingRequests.filter(reqId => reqId.toString() !== mentorId);
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Connection request accepted',
    });
  } catch (error) {
    console.error('Error in accepting connection request:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again later.',
    });
  }
};

// Get connection status (for a student checking their connection status with a mentor)
exports.getConnectionStatus = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const userId = req.user._id;

    const mentor = await Mentor.findById(mentorId);
    const user = await User.findById(userId);

    if (!mentor || !user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Mentor or user not found',
      });
    }

    // Check the connection status
    if (mentor.connections.includes(userId)) {
      return res.status(200).json({
        status: 'connected',
      });
    }

    if (mentor.pendingRequests.includes(userId)) {
      return res.status(200).json({
        status: 'requested',
      });
    }

    return res.status(200).json({
      status: 'not_connected',
    });
  } catch (error) {
    console.error('Error in checking connection status:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again later.',
    });
  }
};

// Decline/Remove a connection request or remove an existing connection
exports.removeConnection = async (req, res) => {
  try {
    const { mentorId } = req.body;
    const userId = req.user._id;

    const mentor = await Mentor.findById(mentorId);
    const user = await User.findById(userId);

    if (!mentor || !user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Mentor or user not found',
      });
    }

    // Remove the user from mentor's connections or pendingRequests
    mentor.connections = mentor.connections.filter(connId => connId.toString() !== userId);
    mentor.pendingRequests = mentor.pendingRequests.filter(reqId => reqId.toString() !== userId);
    await mentor.save();

    // Remove the mentor from user's connections or pendingRequests
    user.connections = user.connections.filter(connId => connId.toString() !== mentorId);
    user.pendingRequests = user.pendingRequests.filter(reqId => reqId.toString() !== mentorId);
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Connection removed successfully',
    });
  } catch (error) {
    console.error('Error in removing connection:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again later.',
    });
  }
};
