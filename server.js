const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./app/models');
const adminRoutes = require('E:/SW2 PROJECT/iotHumanDetection/app/Routes');
const sensorRoutes = require('E:/SW2 PROJECT/iotHumanDetection/app/Routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/admin', adminRoutes);
app.use('/api/sensor', sensorRoutes);

sequelize
    .authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error: ' + err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
