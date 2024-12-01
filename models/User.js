const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    role: { 
        type: DataTypes.ENUM('OEM Technician', 'Blive Technician', 'TUT', 'Hub Ops'), 
        allowNull: false 
    },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    last_login: { type: DataTypes.DATE }
});

module.exports = User;
