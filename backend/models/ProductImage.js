const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,  // URL of the image stored in Cloudinary
    required: true,
  },
}, { timestamps: true });

const ProductImage = mongoose.model('ProductImage', productImageSchema);
module.exports = ProductImage;
