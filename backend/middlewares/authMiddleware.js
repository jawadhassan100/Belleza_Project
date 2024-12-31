const jwt = require('jsonwebtoken');
const User = require("../models/User")

// Middleware to protect routes
const auth = async(req, res, next) => {
  const token = req.headers.authorization;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    // console.log("Authenticated User:", req.user); // Debug log
    next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

// Middleware to check if admin
const adminAuth = (req, res, next) => {
  // console.log("User's Admin Status:", req.user.isAdmin); // Debug log
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: "Admin access required" });
  }
  next();
};

module.exports = { auth, adminAuth };
