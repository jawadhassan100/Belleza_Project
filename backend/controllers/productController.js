const Product = require('../models/Product')
const cloudinary = require('../config/cloudinary');


exports.addProduct = async (req, res) => {
    try {
      const { name, description, price, ingredients } = req.body;
  
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ msg: "No image was uploaded" });
      }
  
      // Helper function to upload an image to Cloudinary
      const uploadToCloudinary = (file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url); // Resolve with the Cloudinary URL
            }
          );
  
          stream.end(file.buffer); // Send the buffer to Cloudinary
        });
      };
  
      // Upload the image to Cloudinary
      const uploadedImage = await uploadToCloudinary(req.file);
  
      // Create a new product document
      const product = new Product({
        name,
        description,
        price,
        ingredients,
        mainImage: [uploadedImage], // Store the single uploaded image URL in an array
      });
  
      await product.save();
      res.status(201).json({ msg: "Product added successfully", product });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  

  
  exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ msg: "Product not found" });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.updateProduct = async (req, res) => {
    try {
      const { name, description, price, ingredients } = req.body;
  
      let updatedProductData = { name, description, price, ingredients };

      const uploadToCloudinary = (file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url); 
            }
          );
  
          stream.end(file.buffer); 
        });
      };
  
      if (req.file) {
        // Upload the new image to Cloudinary
        const uploadedImage = await uploadToCloudinary(req.file);
        updatedProductData.mainImage = [uploadedImage]; // Update the product with the new image URL
      }
      const product = await Product.findByIdAndUpdate(req.params.id, updatedProductData, { new: true });

      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
  
      res.status(200).json({ msg: "Product updated successfully", product });
    } catch (err) {
      console.error("Error updating product:", err.message);
      res.status(500).json({ error: err.message });
    }
  };

  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ msg: "Product not found" });
      res.status(200).json({ msg: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };