const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "No token provided, authorization denied",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
