const { Admin } = require('../models');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ where: { email, password } });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful', admin });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create admin', error });
    }
};

exports.getAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByPk(id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch admin', error });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch admins', error });
    }
};
