const express = require('express');
const router = express.Router();
const ServiceReportController = require('../controllers/ServiceReportController');


router.post('/', ServiceReportController.addServiceReport);
router.put('/:reportId', ServiceReportController.updateServiceReport);
router.get('/:reportId', ServiceReportController.getServiceReportById);
router.get('/', ServiceReportController.getAllServiceReports);

module.exports = router;
