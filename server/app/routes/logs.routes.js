const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logs.controller');
const excelController= require('../controllers/excel.controller');


router.get("/admin", logsController.getAdminLogs)
router.get("/sensor", logsController.getSensorLogs)
router.get("/maintenance", logsController.getSensorLogs)

router.get("/admin/excel", excelController.downloadAdminLogs)
router.get("/sensor/excel", excelController.downloadSensorLogs)
router.get("/maintenance/excel", excelController.downloadMaintenanceLogs)

module.exports = router
