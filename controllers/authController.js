const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Register
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      const err = new Error('Email already in use');
      err.statusCode = 400;
      return next(err);
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};

// Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      const err = new Error('Invalid credentials');
      err.statusCode = 401;
      return next(err);
    }

    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};

// Profile
exports.getMe = async (req, res, next) => {
  res.json({ success: true, user: req.user });
};
