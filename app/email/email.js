const nodemailer = require('nodemailer');

const sendEmail = async (recipient, subject, htmlContent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ssh493147@gmail.com',
                pass: 'yarf vpbu evyq orye',
            },
        });

        const mailOptions = {
            from: 'ssh493147@gmail.com',
            to: recipient,
            subject: subject,
            html: htmlContent, // Use HTML content for the email body
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(`Failed to send email to ${recipient}: ${error.message}`);
        throw error; 
    }
};

module.exports = { sendEmail };

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
