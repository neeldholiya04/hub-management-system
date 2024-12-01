const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vehicle = require('./Vehicle');
const User = require('./User');

const ServiceReport = sequelize.define('ServiceReport', {
  report_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    references: { model: Vehicle, key: 'vehicle_id' },
    allowNull: false,
  },
  service_entry_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  service_exit_time: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  service_tat: {
    type: DataTypes.INTEGER,  
    allowNull: true,
    defaultValue: null,
  },
  technician_id: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'user_id' },
    allowNull: false,
  },
  service_details: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Automatically calculate TAT before saving
ServiceReport.beforeSave(async (serviceReport) => {
  if (serviceReport.service_entry_time && serviceReport.service_exit_time) {
    const entryTime = new Date(serviceReport.service_entry_time);
    const exitTime = new Date(serviceReport.service_exit_time);

    if (exitTime > entryTime) {
      const serviceTAT = (exitTime - entryTime) / (1000 * 60); 
      serviceReport.service_tat = serviceTAT;
    } else {
      throw new Error('Exit time cannot be earlier than entry time');
    }
  }
});

// Recalculate TAT when the exit time is updated
ServiceReport.afterUpdate(async (serviceReport) => {
  if (serviceReport.service_exit_time && serviceReport.service_entry_time) {
    const entryTime = new Date(serviceReport.service_entry_time);
    const exitTime = new Date(serviceReport.service_exit_time);
    
    if (exitTime > entryTime) {
      const serviceTAT = (exitTime - entryTime) / (1000 * 60); 
      serviceReport.service_tat = serviceTAT;
    } else {
      serviceReport.service_tat = null;
    }
  }
});

module.exports = ServiceReport;
