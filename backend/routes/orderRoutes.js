const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middlewares/authMiddleware');
const { createOrder, getAllOrders, getUserOrders, updateOrderStatus  , deleteOrder} = require('../controllers/orderController');

// User routes
router.post('/create',  createOrder);
router.get('/orders',  getUserOrders);

// Admin routes
router.get('/all', auth, adminAuth, getAllOrders);
router.put('/update-status', auth, adminAuth, updateOrderStatus);
router.delete('/delete/:orderId', auth, adminAuth, deleteOrder);

module.exports = router;
