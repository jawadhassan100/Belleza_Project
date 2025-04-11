const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config()

const createTransporter = () => {
    console.log("SMTP transporter created...");
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            // Do not fail on invalid certs
            rejectUnauthorized: false
          }
    });
};

module.exports = createTransporter;
