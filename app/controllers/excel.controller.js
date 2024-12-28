const ExcelJS = require('exceljs');
const { Sensor, Admin, SensorLogs, AdminLogs, MaintenanceLogs }  = require("../models")

const downloadMaintenanceLogs = async (req, res) => {
    try {
        const logs = await MaintenanceLogs.findAll({
            include: [{ model: Sensor, attributes: ['name'] }], 
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Maintenance Logs');

        worksheet.columns = [
            { header: 'Log ID', key: 'id', width: 10 },
            { header: 'Sensor ID', key: 'sensor_id', width: 15 },
            { header: 'Sensor Name', key: 'sensor_name', width: 25 },
            { header: 'Created At', key: 'createdAt', width: 20 },
            { header: 'Updated At', key: 'updatedAt', width: 20 },
        ];

        logs.forEach(log =>
            worksheet.addRow({
                id: log.id,
                sensor_id: log.sensor_id,
                sensor_name: log.Sensor?.name || 'N/A',
                createdAt: log.createdAt,
                updatedAt: log.updatedAt,
            })
        );

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="MaintenanceLogs.xlsx"');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error generating Excel file for Maintenance Logs' });
    }
};

const downloadAdminLogs = async (req, res) => {
    try {
        const logs = await AdminLogs.findAll({
            include: [
                { model: Admin, attributes: ['name'] }, // Include related admin data
                { model: Sensor, attributes: ['name'] }, // Include related sensor data
            ],
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Admin Logs');

        worksheet.columns = [
            { header: 'Log ID', key: 'id', width: 10 },
            { header: 'Admin ID', key: 'admin_id', width: 15 },
            { header: 'Admin Name', key: 'admin_name', width: 25 },
            { header: 'Sensor ID', key: 'sensor_id', width: 15 },
            { header: 'Sensor Name', key: 'sensor_name', width: 25 },
            { header: 'Action', key: 'action', width: 20 },
            { header: 'Created At', key: 'createdAt', width: 20 },
            { header: 'Updated At', key: 'updatedAt', width: 20 },
        ];

        logs.forEach(log =>
            worksheet.addRow({
                id: log.id,
                admin_id: log.admin_id,
                admin_name: log.Admin?.name || 'N/A',
                sensor_id: log.sensor_id,
                sensor_name: log.Sensor?.name || 'N/A',
                action: log.action,
                createdAt: log.createdAt,
                updatedAt: log.updatedAt,
            })
        );

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="AdminLogs.xlsx"');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error generating Excel file for Admin Logs' });
    }
};

const downloadSensorLogs = async (req, res) => {
    try {
        const logs = await SensorLogs.findAll({
            include: [{ model: Sensor, as: "sensor", attributes: ['name'] }], // Include related sensor data
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sensor Logs');


        worksheet.columns = [
            { header: 'Log ID', key: 'id', width: 10 },
            { header: 'Sensor ID', key: 'sensor_id', width: 15 },
            { header: 'Sensor Name', key: 'sensor_name', width: 25 },
            { header: 'Detected', key: 'detected', width: 15 },
            { header: 'Created At', key: 'createdAt', width: 20 },
            { header: 'Updated At', key: 'updatedAt', width: 20 },
        ];

        logs.forEach(log =>
            worksheet.addRow({
                id: log.id,
                sensor_id: log.sensor_id,
                sensor_name: log.sensor.name,
                detected: log.detected ? 'Yes' : 'No',
                createdAt: log.createdAt,
                updatedAt: log.updatedAt,
            })
        );

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="SensorLogs.xlsx"');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error generating Excel file for Sensor Logs' });
    }
};

module.exports = {
    downloadMaintenanceLogs,
    downloadAdminLogs,
    downloadSensorLogs,
};
