const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config()

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // Change this to your email service provider if needed
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

module.exports = createTransporter;
