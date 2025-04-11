const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (email, subject, htmlContent) => {
    
    try {
        console.log("Sending email to:", email);
        const data = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: email,
            subject: subject,
            html: htmlContent
        });
       
        console.log("Email sent via Resend:", data);
        return true;
    } catch (error) {
        console.error("Resend email error:", error);
        return false;
    }
};

module.exports = sendMail;