const ProductImage = require("../models/ProductImage");
const cloudinary = require("../config/cloudinary");

exports.addImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No image was uploaded" });
    }

    // Helper function to upload image to Cloudinary
    const uploadToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "product_images" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url); // Return the Cloudinary URL
          }
        );
        stream.end(file.buffer); // Send the buffer to Cloudinary
      });
    };

    // Upload image to Cloudinary
    const uploadedImage = await uploadToCloudinary(req.file);

    // Save the image URL to the database
    const newImage = new ProductImage({ imageUrl: uploadedImage });
    await newImage.save();

    res.status(201).json({ msg: "Image added successfully", newImage });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.getAllImages = async (req, res) => {
  try {
    const images = await ProductImage.find();

    if (images.length === 0) {
      return res.status(404).json({ msg: "No images found" });
    }

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.updateImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ msg: "No image was uploaded" });
    }

    // Helper function to upload image to Cloudinary
    const uploadToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "product_images" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url); // Return the Cloudinary URL
          }
        );
        stream.end(file.buffer); // Send the buffer to Cloudinary
      });
    };

    // Upload new image to Cloudinary
    const uploadedImage = await uploadToCloudinary(req.file);

    // Update the image record
    const updatedImage = await ProductImage.findByIdAndUpdate(
      imageId,
      { imageUrl: uploadedImage },
      { new: true } // Return the updated document
    );

    if (!updatedImage) {
      return res.status(404).json({ msg: "Image not found" });
    }

    res.status(200).json({ msg: "Image updated successfully", updatedImage });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete a specific image
exports.deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    const image = await ProductImage.findById(imageId);
    if (!image) {
      return res.status(404).json({ msg: "Image not found" });
    }

    // Extract public_id from the image URL
    const publicId = image.imageUrl.split('/').slice(-1)[0].split('.')[0];

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(`product_images/${publicId}`);

    // Delete from database
    await ProductImage.findByIdAndDelete(imageId);

    res.status(200).json({ msg: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};