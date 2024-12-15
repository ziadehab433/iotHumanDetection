const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.post('/', adminController.createAdmin);           
router.get('/:id', adminController.getAdminById);        
router.get('/', adminController.getAllAdmins);           
router.delete('/:id', adminController.deleteAdmin);           

module.exports = router;
