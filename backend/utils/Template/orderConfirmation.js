const orderConfirmation = (userName, order, deliveryCharge, isAdmin = false) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #fff; background-color: #000; padding: 20px;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #444; padding: 20px;">
        <div style="text-align: center;">
          <img src="cid:logo" alt="Website Logo" style="max-width: 80px; border-radius: 10%;" />
        </div>
        <h1 style="color: #F8D7C4; text-align: center; margin-top: 5px;">
          ${isAdmin ? 'New Order Notification' : 'Order Confirmation'}
        </h1>
        <p style="font-size: 16px;">Hello <strong>${userName}</strong>,</p>
        ${isAdmin ? `<p><strong>Date:</strong> ${day}, ${formattedDate}</p>` : ''}

        <p>
          ${isAdmin 
            ? "A new order has been placed on your website. Here are the details:"
            : "Thank you for placing your order with us! We're excited to process your order and get it delivered to you as soon as possible."
          }
        </p>

        <h2 style="color: #F8D7C4; border-bottom: 1px solid #F8D7C4; padding-bottom: 5px;">Order Details</h2>
        <ul style="list-style: none; padding: 0; font-size: 14px;">
          ${order.products.map(item => `
            <li style="margin-bottom: 15px; border-bottom: 1px solid #F8D7C4;  padding-bottom: 10px;">
                <strong>Product ID:</strong> ${item.product}<br />
                <strong>Quantity:</strong> ${item.quantity}<br/>
            </li>
          `).join('')}
        </ul>

        <p style="font-size: 16px; margin: 10px 0;">
          <strong>Product Total:</strong> ${order.totalPrice - deliveryCharge} PKR
        </p>

        <p style="font-size: 16px; margin: 10px 0;">
          <strong>Delivery Charge:</strong> ${deliveryCharge} PKR
        </p>

        <p style="font-size: 16px; margin: 10px 0;">
          <strong>Total Price:</strong> ${order.totalPrice} PKR
        </p>

        <p style="font-size: 16px; margin: 10px 0;">
          <strong>Shipping Address:</strong> ${order.address}, ${order.city}, ${order.province}
        </p>

        <p style="font-size: 16px; margin: 10px 0;">
          <strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}
        </p>

        ${isAdmin 
          ? `<p style="font-size: 16px; margin: 10px 0;"><strong>Customer Email:</strong> ${order.email}</p>`
          : ''}

        ${isAdmin 
          ? `<p style="font-size: 16px; margin: 10px 0;"><strong>CPhone Number:</strong> ${order.phoneNumber}</p>`
          : ''}
        
        <p style="font-size: 14px; margin-top: 20px;">
          ${isAdmin 
            ? "Please process this order at the earliest convenience."
            : "We will notify you when your items are on their way. If you have any questions or concerns, feel free to contact us."
          }
        </p>

        <footer style="margin-top: 30px; text-align: center; font-size: 12px; color: #ccc;">
          <p>Thank you for shopping with us!</p>
          <p>&copy; ${currentDate.getFullYear()} Belleza</p>
        </footer>
      </div>
    </div>
  `;
};

module.exports = orderConfirmation