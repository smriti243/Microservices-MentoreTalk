const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  
  console.log('Signup attempt:', { username, email, role }); // Debug log
  
  if (!username || !email || !password || !role) {
    console.log('Missing required fields');
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log('User already exists:', existingUser.username);
      return res.status(400).json({ message: 'User with this email or username already exists.' });
    }

    const newUser = new User({
      username,
      email,
      password, // The password will be hashed by the pre-save hook
      role
    });

    await newUser.save();
    console.log('New user created:', newUser.username);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  
  console.log('Login attempt for:', usernameOrEmail);

  try {
    const user = await User.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] });
    
    if (!user) {
      console.log('Login failed: User not found -', usernameOrEmail);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', user.username);

    const isMatch = await user.correctPassword(password);
    
    if (!isMatch) {
      console.log('Login failed: Incorrect password for user -', user.username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    console.log('Login successful for user:', user.username);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
