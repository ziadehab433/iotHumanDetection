const express = require('express');
const router = express.Router();
const adminController = require('../controllers/logs.controller');

router.get("/admin", adminController.getAdminLogs)
router.get("/sensor", adminController.getSensorLogs)
router.get("/maintenance", adminController.getSensorLogs)

module.exports = router
