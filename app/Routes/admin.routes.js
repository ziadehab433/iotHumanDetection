const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.post('/login', adminController.login);            
router.post('/', adminController.createAdmin);           
router.get('/:id', adminController.getAdminById);        
router.get('/', adminController.getAllAdmins);           

module.exports = router;
