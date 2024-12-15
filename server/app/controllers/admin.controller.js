const { Admin, AdminLogs } = require('../models');

exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.status(201).json({ success: true, payload: newAdmin });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create admin', error });
    }
};

exports.getAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByPk(id);
        if (!admin) return res.status(404).json({ success: true, message: 'Admin not found' });
        res.json({ success: true, payload: admin });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch admin', error });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json({ success: true, payload: admins });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch admins', error });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const deleted = await Admin.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Admin not found' });
        res.json({ success: true, message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete admin', error });
    }
};
