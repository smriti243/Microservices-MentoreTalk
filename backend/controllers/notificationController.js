const User = require('../models/userModel');

exports.sendNotification = async (req, res) => {
  try {
    const { mentorId, message } = req.body;

    // Find the mentor and add the notification
    const mentor = await User.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    mentor.notifications.push({
      message,
      type: 'connection_request',
      sender: req.user._id, // Assuming `req.user` contains the logged-in user's ID
      createdAt: new Date(),
    });

    await mentor.save();
    res.status(200).json({ status: 'success', message: 'Notification sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to send notification' });
  }
};
