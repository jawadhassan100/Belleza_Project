const express = require('express');
const { getDashboardData } = require('../controllers/dashboardController');
const { auth, adminAuth } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to fetch dashboard data
router.get('/data', auth , adminAuth , getDashboardData);

module.exports = router;
