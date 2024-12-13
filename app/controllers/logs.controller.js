const { AdminLogs, MaintenanceLogs, SensorLogs } = require("../models")

exports.getAdminLogs = async (req, res) => { 
    try {
        const admins = await AdminLogs.findAll();
        res.json({ success: true, payload: admins });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch admin logs', error });
    }
}

exports.getMaintenanceLogs = async (req, res) => { 
    try {
        const admins = await MaintenanceLogs.findAll();
        res.json({ success: true, payload: admins });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch maintenance logs', error });
    }
}

exports.getSensorLogs = async (req, res) => { 
    try {
        const admins = await SensorLogs.findAll();
        res.json({ success: true, payload: admins });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch sensor logs', error });
    }
}
