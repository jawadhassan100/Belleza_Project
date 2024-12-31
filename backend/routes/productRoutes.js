const express = require("express");
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { auth , adminAuth } = require("../middlewares/authMiddleware");
const upload = require('../config/multer');
const router = express.Router();


router.post("/",upload.single('image'),auth , adminAuth, addProduct); 
router.get("/", getProducts); 
router.get("/:id", getProductById); 
router.put("/:id", auth , adminAuth, updateProduct); 
router.delete("/:id",auth ,  adminAuth, deleteProduct); 

module.exports = router;