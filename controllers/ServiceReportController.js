const ServiceReportService = require('../services/ServiceReportService');

// Add a new service report
const addServiceReport = async (req, res) => {
  const { vehicle_id, service_entry_time, service_exit_time, service_details, technician_id, status } = req.body;

  try {
    const newServiceReport = await ServiceReportService.createServiceReport({
      vehicle_id,
      service_entry_time,
      service_exit_time,
      service_details,
      technician_id,
      status,
    });

    res.status(201).json({
      report_id: newServiceReport.report_id,
      vehicle_id: newServiceReport.vehicle_id,
      service_entry_time: newServiceReport.service_entry_time,
      service_exit_time: newServiceReport.service_exit_time,
      service_tat: newServiceReport.service_tat,  
      technician_id: newServiceReport.technician_id,
      service_details: newServiceReport.service_details,
      status: newServiceReport.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing service report
const updateServiceReport = async (req, res) => {
  const { reportId } = req.params;
  const { service_entry_time, service_exit_time, service_details, status } = req.body;

  try {
    const updatedServiceReport = await ServiceReportService.updateServiceReport(reportId, {
      service_entry_time,
      service_exit_time,
      service_details,
      status,
    });

    res.status(200).json({
      report_id: updatedServiceReport.report_id,
      vehicle_id: updatedServiceReport.vehicle_id,
      service_entry_time: updatedServiceReport.service_entry_time,
      service_exit_time: updatedServiceReport.service_exit_time,
      service_tat: updatedServiceReport.service_tat,
      technician_id: updatedServiceReport.technician_id,
      service_details: updatedServiceReport.service_details,
      status: updatedServiceReport.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a service report by ID
const getServiceReportById = async (req, res) => {
  const { reportId } = req.params;

  try {
    const serviceReport = await ServiceReportService.getServiceReportById(reportId);
    res.status(200).json(serviceReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all service reports
const getAllServiceReports = async (req, res) => {
  try {
    const serviceReports = await ServiceReportService.getAllServiceReports();
    res.status(200).json(serviceReports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addServiceReport,
  updateServiceReport,
  getServiceReportById,
  getAllServiceReports,
};
