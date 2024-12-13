const { Sensor, AdminLogs } = require('../models');

exports.createSensor = async (req, res) => {
    try {
        const loc = req.body.location.split(",")
        const sensor = await Sensor.create({ 
            name: req.body.name,
            maintenance: req.body.maintenance,
            location: { type: 'Point', coordinates: loc },
            admin_id: req.body.admin_id,
            status: req.body.status
        });

        await AdminLogs.create({ 
            sensor_id: sensor.id, 
            admin_id: req.body.admin_id,
            action: "create"
        })

        res.status(201).json( { success: true, payload: sensor });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create sensor', error });
    }
};

exports.getSensorById = async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) return res.status(404).json({ success: true, message: 'Sensor not found' });
        res.json({ success: true, payload: sensor });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch sensor', error });
    }
};

exports.getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.findAll();
        res.json({ success: true, payload: sensors });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch sensors', error });
    }
};

exports.updateSensor = async (req, res) => {
    try {
        const loc = req.body.location.split(",")
        const updated = await Sensor.update({ 
            name: req.body.name,
            maintenance: req.body.maintenance,
            location: { type: 'Point', coordinates: loc },
            admin_id: req.body.admin_id,
            status: req.body.status
        }, { where: { id: req.params.id } });

        await AdminLogs.create({ 
            sensor_id: updated[0].id, 
            admin_id: req.body.admin_id,
            action: "update"
        })

        if (!updated[0]) return res.status(404).json({ success: true, message: 'Sensor not found' });
        res.json({ success: true, message: 'Sensor updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update sensor', error });
    }
};

exports.deleteSensor = async (req, res) => {
    try {
        const deleted = await Sensor.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ success: true, message: 'Sensor not found' });
        res.json({ success: true, message: 'Sensor deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete sensor', error });
    }
};


///////////////

const { sendEmail } = require('../Email/sendingEmail');
const { Admin } = require('../models'); // Assuming Admin model includes `super` flag

/**
 * Notify the super admin when a critical event occurs.
 * @param {number} sensorId - The sensor ID triggering the notification.
 */
const notifySuperAdmin = async (sensorId) => {
    try {
        // Find the super admin's email
        const superAdmin = await Admin.findOne({ where: { super: true } });
        if (!superAdmin) {
            console.error('No super admin found. Notification skipped.');
            return;
        }

        const subject = "Critical Alert: Human Detected";
        const htmlContent = `
            <h1>Critical Alert</h1>
            <p>The sensor with ID <strong>${sensorId}</strong> has detected human activity.</p>
            <p>Please investigate immediately.</p>
        `;

        // Send the email to the super admin
        await sendEmail(superAdmin.email, subject, htmlContent);
        console.log(`Notification sent to super admin: ${superAdmin.email}`);
    } catch (error) {
        console.error('Failed to notify super admin:', error.message);
    }
};

module.exports = { notifySuperAdmin };
