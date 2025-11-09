const nodemailer = require('nodemailer');

// 1. Create the Transporter
// It reads the credentials from 'process.env'
// 'dotenv' must be configured in server.js for this to work
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 2. Define and Export the Email Function
/**
 * Sends a welcome email to a new user.
 * @param {string} userEmail - The email address of the new user.
 * @param {string} username - The username of the new user.
 */
function sendWelcomeEmail(userEmail, username) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("Email credentials not set. Skipping email.");
        return; // Don't try to send if .env is missing
    }

    const mailOptions = {
        from: '"WhatsMyQuote Founder" <jawad.chowdhury2018@gmail.com>',
        to: userEmail,
        subject: 'Welcome onboard!',
        html: `
            <h3>Hi ${username}, welcome aboard!</h3>
            <p>Thanks for signing up for BellQuote. We are excited to have you.</p>
            <p>Best,<br>Jawad</p>
        `
    };

    // We use a callback here so the signup route doesn't have to 'await' it.
    // This is "fire and forget."
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending welcome email:', error);
        } else {
            console.log('Welcome email sent: ' + info.response);
        }
    });
}

// 3. Export the function
module.exports = { sendWelcomeEmail };