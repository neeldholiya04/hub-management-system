const ServiceReport = require('../models/ServiceReport');

const createServiceReport = async (data) => {
  try {
    const serviceReport = await ServiceReport.create(data);
    return serviceReport;
  } catch (error) {
    throw new Error(`Error creating service report: ${error.message}`);
  }
};

const updateServiceReport = async (reportId, data) => {
  try {
    const serviceReport = await ServiceReport.findOne({ where: { report_id: reportId } });

    if (!serviceReport) {
      throw new Error('Service report not found');
    }

    if (data.service_entry_time) serviceReport.service_entry_time = data.service_entry_time;
    if (data.service_exit_time !== undefined) serviceReport.service_exit_time = data.service_exit_time; 
    if (data.service_details) serviceReport.service_details = data.service_details;
    if (data.status) serviceReport.status = data.status;

    // Recalculate TAT whenever the report is updated
    if (serviceReport.service_entry_time && serviceReport.service_exit_time) {
      const entryTime = new Date(serviceReport.service_entry_time);
      const exitTime = new Date(serviceReport.service_exit_time);
      const serviceTAT = (exitTime - entryTime) / (1000 * 60); 
      serviceReport.service_tat = serviceTAT;
    } else {
      serviceReport.service_tat = null; 
    }

    await serviceReport.save();
    return serviceReport;
  } catch (error) {
    throw new Error(`Error updating service report: ${error.message}`);
  }
};

const getServiceReportById = async (reportId) => {
  try {
    const serviceReport = await ServiceReport.findOne({ where: { report_id: reportId } });
    if (!serviceReport) {
      throw new Error('Service report not found');
    }
    return serviceReport;
  } catch (error) {
    throw new Error(`Error fetching service report: ${error.message}`);
  }
};

const getAllServiceReports = async () => {
  try {
    const serviceReports = await ServiceReport.findAll();
    return serviceReports;
  } catch (error) {
    throw new Error(`Error fetching service reports: ${error.message}`);
  }
};

module.exports = {
  createServiceReport,
  updateServiceReport,
  getServiceReportById,
  getAllServiceReports,
};
