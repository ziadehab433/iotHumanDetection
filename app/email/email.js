const nodemailer = require('nodemailer');
const config = require('../config/email.config');

const sendEmail = async (recipient, subject, htmlContent) => {
    try {
        const transporter = nodemailer.createTransport({
            host: config.smtpHost,
            port: config.smtpPort,
            secure: false, 
            auth: {
                user: config.smtpUser,
                pass: config.smtpPassword,
            },
        });

        const mailOptions = {
            from: 'user-8f8cdef5-f3e5-41a4-a5af-f603ed302f8a@mailslurp.biz',
            to: recipient,
            subject: subject,
            html: htmlContent,
        };


        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(`Failed to send email to ${recipient}: ${error.message}`);
        throw error; 
    }
};

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
