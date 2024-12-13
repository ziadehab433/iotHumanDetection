const nodemailer = require('nodemailer');
const config = require('../config/emailConfig'); // Ensure this file has SMTP configuration

/**
 * Sends an email using the configured SMTP server.
 * @param {string} recipient - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} htmlContent - The HTML content of the email.
 */
const sendEmail = async (recipient, subject, htmlContent) => {
    try {
        // Configure the SMTP transporter
        const transporter = nodemailer.createTransport({
            host: config.smtpHost,
            port: config.smtpPort,
            secure: false, // Set to `true` for port 465; leave as `false` for other ports
            auth: {
                user: config.smtpUser,
                pass: config.smtpPassword,
            },
        });

        // Define email options
        const mailOptions = {
            from: 'user-8f8cdef5-f3e5-41a4-a5af-f603ed302f8a@mailslurp.biz', // Replace with your desired sender information
            to: recipient,
            subject: subject,
            html: htmlContent,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${recipient}`);
    } catch (error) {
        console.error(`Failed to send email to ${recipient}: ${error.message}`);
        throw error; // Rethrow to allow the calling function to handle it
    }
};

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
