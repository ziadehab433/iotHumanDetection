const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logs.controller');

router.get("/admin", logsController.getAdminLogs)
router.get("/sensor", logsController.getSensorLogs)
router.get("/maintenance", logsController.getSensorLogs)

module.exports = router
