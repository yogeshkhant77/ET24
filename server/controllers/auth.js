const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "your_jwt_secret", {
    expiresIn: "7d",
  });
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { username, mobile, password } = req.body;

    // Validate input
    if (!username || !mobile || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide username, mobile, and password",
      });
    }

    // Check if user already exists
    let user = await User.findOne({
      $or: [{ mobile }, { username }],
    });

    if (user) {
      return res.status(400).json({
        success: false,
        error: "User with that mobile or username already exists",
      });
    }

    // Create user
    user = await User.create({
      username,
      mobile,
      password,
    });

    // Generate token
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        mobile: user.mobile,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;

    // Validate input
    if (!mobile || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide mobile and password",
      });
    }

    // Find user and select password field
    const user = await User.findOne({ mobile }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Match password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        mobile: user.mobile,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
