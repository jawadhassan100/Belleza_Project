const createTransporter = require('../config/smtpConfig');

const sendEmail = async (email, subject, htmlContent) => {
    const transporter = createTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', {
            error,
            mailOptions: {
                from: mailOptions.from,
                to: mailOptions.to,
                subject: mailOptions.subject
            }
        });
        return false;
    }
};

module.exports = sendEmail;