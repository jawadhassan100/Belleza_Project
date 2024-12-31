const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route for registering the specific user
router.post('/register', register);

// User login route
router.post('/login', login);

// User logout route
router.post('/logout', auth, logout);


module.exports = router;
