const User = require('../models/User'); // Assuming this is the path to the user schema model

// Get all mentors
exports.getAllMentors = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { role: 'mentor' };

    if (search) {
      query = {
        role: 'mentor',
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { skills: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const mentors = await User.find(query);
    res.status(200).json({
      status: 'success',
      results: mentors.length,
      data: { mentors }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
// Get a single mentor by ID
exports.getMentorById = async (req, res) => {
  try {
    const mentor = await User.findById(req.params.id);

    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({
        status: 'fail',
        message: 'Mentor not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { mentor }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update mentor profile
exports.updateMentor = async (req, res) => {
  try {
    const mentor = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({
        status: 'fail',
        message: 'Mentor not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { mentor }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete mentor
exports.deleteMentor = async (req, res) => {
  try {
    const mentor = await User.findByIdAndDelete(req.params.id);

    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({
        status: 'fail',
        message: 'Mentor not found'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Create a new
