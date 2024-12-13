const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const { sequelize } = require('./app/models');

// routes
const adminRoutes = require('./app/routes/admin.routes');
const sensorRoutes = require('./app/routes/sensor.routes');
const authRoutes = require('./app/routes/auth')
const logsRoutes = require('./app/routes/logs.routes')

// middleware
const authenticateJWT = require("./app/middleware/authenticateJWT")

const app = express();

app.use(cors({ origin: "http://localhost:8081" }))

app.use(authenticateJWT)
app.use(bodyParser.json());

// .env broken 
app.use('/api/login', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/sensor', sensorRoutes);
app.use("/api/logs", logsRoutes)

sequelize
    .authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error: ' + err));

sequelize
    .sync()
    .then(() => console.log("db synced successfully"))
    .catch((err) => console.log('Error: ' + err));

module.exports = app
