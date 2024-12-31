const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes')
const orderRoutes = require("./orderRoutes")
const productImageRoutes = require('./productImageRoutes')
const contactRoutes = require('./contactRoutes')
const dashboardRoutes = require("./dashboardRoutes")


router.use('/api', authRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes); 
router.use('/image', productImageRoutes); 
router.use('/contact', contactRoutes); 
router.use('/dashboard', dashboardRoutes);


module.exports = router;