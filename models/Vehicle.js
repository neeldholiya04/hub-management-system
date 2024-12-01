const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vehicle = sequelize.define('Vehicle', {
    vehicle_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    unique_identifier: { type: DataTypes.STRING, allowNull: false, unique: true },
    current_state: { 
        type: DataTypes.ENUM('Service', 'RTD', 'Missing', 'Deployed'), 
        allowNull: false 
    },
    last_state_change: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    entry_time: { type: DataTypes.DATE },
    exit_time: { type: DataTypes.DATE },
    notes: { type: DataTypes.TEXT }
});

module.exports = Vehicle;
