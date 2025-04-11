const Order = require("../models/Order");
const Product = require("../models/Product");
const sendMail = require("../utils/sendMail");
const orderConfirmation = require("../utils/Template/orderConfirmation");

// Create an order directly from a product
exports.createOrder = async (req, res) => {
  try {
    const { address, fullName, email, phoneNumber, city, province, productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const deliveryCharge = 150; 
    const totalQuantity = product.price * quantity 
    const totalPrice = totalQuantity + deliveryCharge; 
    const adminEmail = process.env.ADMIN_EMAIL;

    // Create a new order
    const newOrder = new Order({
      fullName,
      email,
      phoneNumber,
      city,
      province,
      products: [{ product: product._id, quantity }], 
      address,
      paymentMethod: 'cash on delivery', 
      totalPrice,
    });

    await newOrder.save();

    // Send customer confirmation email
    const customerSubject = "Order Confirmation";
    const customerHtmlContent = orderConfirmation(fullName, newOrder, deliveryCharge);
    await sendMail(email, customerSubject, customerHtmlContent);

    // Send admin notification email
    const adminSubject = "New Order Notification";
    const adminHtmlContent = orderConfirmation("Admin", newOrder, deliveryCharge, true);
    await sendMail(adminEmail, adminSubject, adminHtmlContent);

    // Send success response
    res.status(200).json({ message: "Order created successfully", order: newOrder });
    console.log("Order:", newOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.product", "name price") // Populate product details
      .exec();
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  // Get orders by email (publicly accessible)
  exports.getUserOrders = async (req, res) => {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ message: "Email is required to fetch orders" });
      }

      // Find orders by the provided email address
      const orders = await Order.find({ email })
        .populate("products.product", "name price") // Populate product details
        .exec();

      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this email" });
      }

      res.status(200).json({ orders });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an order (admin only)
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
