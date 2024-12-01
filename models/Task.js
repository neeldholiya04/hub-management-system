const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Vehicle = require('./Vehicle');

const Task = sequelize.define('Task', {
    task_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    assigned_to: { 
        type: DataTypes.INTEGER, 
        references: { model: User, key: 'user_id' },
        onDelete: 'SET NULL'
    },
    created_by: { 
        type: DataTypes.INTEGER, 
        references: { model: User, key: 'user_id' },
        onDelete: 'SET NULL'
    },
    vehicle_id: { 
        type: DataTypes.INTEGER, 
        references: { model: Vehicle, key: 'vehicle_id' },
        onDelete: 'CASCADE'
    },
    status: { 
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'), 
        defaultValue: 'Pending' 
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    due_date: { type: DataTypes.DATE },
    completed_at: { type: DataTypes.DATE }
});

module.exports = Task;
