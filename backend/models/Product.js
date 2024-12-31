const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mainImage: [
    {
      type: String, // URL of the image
      required: true,
    },
  ],

  ingredients: [
    {
      type: String, // List of ingredients
    },
  ],


}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
