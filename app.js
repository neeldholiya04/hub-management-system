const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const vehicleRoutes = require('./routes/vehicleRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const serviceReportRoutes = require('./routes/serviceReportRoutes');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/service-reports', serviceReportRoutes);

// Database Sync and Server Start
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.error('Failed to sync database:', err);
});
