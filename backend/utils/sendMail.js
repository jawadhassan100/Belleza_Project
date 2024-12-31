const nodemailer = require('nodemailer')
const createTransporter = require('../config/smtpConfig');
const path = require('path');

const sendEmail = (email, subject, htmlContent) => {
    const transporter = createTransporter(); // Use the transporter from smtpConfig

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: htmlContent ,// Use HTML content
        attachments: [
            {
              filename: 'bellezaLogo.jpg',
              path: path.join(__dirname, './Template/image/bellezaLogo.jpg'),
              cid: 'logo' // Match the cid used in the HTML template
            },
          ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            // Log detailed error information for debugging
            console.error('Email failed to send:', {
                from: mailOptions.from,
                to: mailOptions.to,
                subject: mailOptions.subject,
                text: mailOptions.text
            });
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendEmail