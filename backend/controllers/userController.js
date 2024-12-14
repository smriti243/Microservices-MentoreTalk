const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const {
    username,
    email,
    bio,
    education,
    experience,
    skills,
    teachingExperience,
    academicInstitution,
    currentCompany,
    otherCompany,
    previousCompanies,
    mentorSpecialty,
    profilePicture
  } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (education) {
      user.education = {
        level: education.level,
        fieldOfStudy: education.fieldOfStudy,
        institution: education.institution,
        graduationYear: education.graduationYear,
        otherInstitution: education.otherInstitution
      };
    }
    if (experience) {
      user.experience = {
        company: experience.company,
        jobTitle: experience.jobTitle,
        startDate: experience.startDate,
        endDate: experience.endDate,
        responsibilities: experience.responsibilities
      };
    }
    if (skills) user.skills = skills;
    if (teachingExperience) user.teachingExperience = teachingExperience;
    if (academicInstitution) user.academicInstitution = academicInstitution;
    if (currentCompany) user.currentCompany = currentCompany;
    if (otherCompany) user.otherCompany = otherCompany;
    if (previousCompanies) user.previousCompanies = previousCompanies;
    if (user.role === 'mentor' && mentorSpecialty) {
      user.mentorSpecialty = mentorSpecialty;
    }
    if (profilePicture) user.profilePicture = profilePicture;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      bio: updatedUser.bio,
      education: updatedUser.education,
      experience: updatedUser.experience,
      skills: updatedUser.skills,
      teachingExperience: updatedUser.teachingExperience,
      academicInstitution: updatedUser.academicInstitution,
      currentCompany: updatedUser.currentCompany,
      otherCompany: updatedUser.otherCompany,
      previousCompanies: updatedUser.previousCompanies,
      role: updatedUser.role,
      mentorSpecialty: updatedUser.mentorSpecialty,
      profilePicture: updatedUser.profilePicture
    });
  } catch (error) {
    console.error('Error in updateProfile:', error);
    res.status(500).json({
      message: 'Error updating user profile',
      error: error.message
    });
  }
};

// Add mentor session (for mentors only)
exports.addMentorSession = async (req, res) => {
  const { title, date } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'mentor') {
      return res.status(403).json({ message: 'Unauthorized. Only mentors can add sessions.' });
    }

    user.mentorSessions.push({ title, date });
    await user.save();

    res.status(201).json({
      message: 'Mentor session added successfully',
      session: { title, date }
    });
  } catch (error) {
    console.error('Error in addMentorSession:', error);
    res.status(500).json({
      message: 'Error adding mentor session',
      error: error.message
    });
  }
};