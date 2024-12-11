const { Sensor } = require('../models');

exports.createSensor = async (req, res) => {
    try {
        const sensor = await Sensor.create(req.body);
        res.status(201).json(sensor);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create sensor', error });
    }
};

exports.getSensorById = async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) return res.status(404).json({ message: 'Sensor not found' });
        res.json(sensor);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch sensor', error });
    }
};

exports.getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.findAll();
        res.json(sensors);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch sensors', error });
    }
};

exports.updateSensor = async (req, res) => {
    try {
        const updated = await Sensor.update(req.body, { where: { id: req.params.id } });
        if (!updated[0]) return res.status(404).json({ message: 'Sensor not found' });
        res.json({ message: 'Sensor updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update sensor', error });
    }
};

exports.deleteSensor = async (req, res) => {
    try {
        const deleted = await Sensor.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Sensor not found' });
        res.json({ message: 'Sensor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete sensor', error });
    }
};
