const express = require('express');
const router = express.Router();
const productImageController = require('../controllers/productImageController');
const { auth , adminAuth } = require("../middlewares/authMiddleware");
const upload = require('../config/multer');


router.post('/add', upload.single('image'), auth , adminAuth,productImageController.addImage);

router.put('/:id', upload.single('image'), auth , adminAuth, productImageController.updateImage);

router.get('/all', productImageController.getAllImages);

router.delete('/:id', auth , adminAuth, productImageController.deleteImage);

module.exports = router;
