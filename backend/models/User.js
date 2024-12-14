const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['mentor', 'student'], required: true },
  bio: { type: String },
  
  education: {
    level: { type: String, enum: ["Bachelor's", "Master's", "PhD", "Diploma", "Other"] },
    fieldOfStudy: { type: String },
    institution: { type: String },
    graduationYear: { type: String },
    otherInstitution: { type: String } // For when institution is 'Other'
  },
  
  experience: {
    company: { type: String },
    jobTitle: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    responsibilities: { type: String }
  },
  
  teachingExperience: { type: String, enum: ['Professor', 'Corporate Mentor', 'Not involved in teaching'] },
  academicInstitution: { type: String }, // Only if teachingExperience is 'Professor'
  currentCompany: { type: String },
  otherCompany: { type: String }, // Only if currentCompany is 'Other'
  previousCompanies: [{ type: String }],
  
  skills: [{ type: String }],
  mentorSpecialty: [{ type: String }],
  
  mentorSessions: [
    {
      title: { type: String },
      date: { type: Date }
    }
  ],

  profilePicture: { type: String }, // URL to profile picture
  createdAt: { type: Date, default: Date.now },

  
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Accepted connections
  pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Requests sent by others

  notifications: [
    {
      message: { type: String },
      type: { type: String, enum: ['connection_request', 'connection_accept'] },
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }
  ],
});



userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);