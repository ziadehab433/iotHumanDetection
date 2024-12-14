const nodemailer = require('nodemailer');
const config = require('../config/emailConfig');
/**
 * Sends an email using the Gmail SMTP server.
 * @param {string} recipient - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} htmlContent - The HTML content of the email.
 */
const sendEmail = async (recipient, subject, htmlContent) => {
    try {
        // Configure the Gmail SMTP transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ssh493147@gmail.com', // Replace with your Gmail address
                pass: 'yarf vpbu evyq orye',       // Replace with your Gmail app password
            },
        });

        // Define email options
        const mailOptions = {
            from: 'ssh493147@gmail.com',
            to: recipient,
            subject: subject,
            html: htmlContent, // Use HTML content for the email body
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${recipient}: ${info.response}`);
    } catch (error) {
        console.error(`Failed to send email to ${recipient}: ${error.message}`);
        throw error; // Rethrow to allow the calling function to handle it
    }
};

module.exports = { sendEmail };

/**
 * Notify the super admin when a critical event occurs.
 * @param {number} sensorId - The sensor ID triggering the notification.
 * @param {string} superAdminEmail - The email address of the super admin.
 */
const notifySuperAdmin = async (sensorId, superAdminEmail) => {
    const subject = "Critical Alert: Human Detected";
    const htmlContent = `
        <h1>Critical Alert</h1>
        <p>The sensor with ID <strong>${sensorId}</strong> has detected human activity.</p>
        <p>Please investigate immediately.</p>
    `;

    try {
        await sendEmail(superAdminEmail, subject, htmlContent);
        console.log(`Notification sent to super admin: ${superAdminEmail}`);
    } catch (error) {
        console.error('Error sending notification email:', error.message);
    }
};

module.exports = { sendEmail, notifySuperAdmin };
