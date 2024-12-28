const { Sensor, AdminLogs } = require('../models');

exports.createSensor = async (req, res) => {
    try {
        const loc = req.body.location.split(",")
        const sensor = await Sensor.create({ 
            name: req.body.name,
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
        console.log("err: ", error)
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
            location: { type: 'Point', coordinates: loc },
            admin_id: req.body.admin_id,
            status: req.body.status
        }, { where: { id: req.params.id } });

        await AdminLogs.create({ 
            sensor_id: req.params.id, 
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
