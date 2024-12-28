const { Sequelize } = require('sequelize');
const config = require('../config/db.config'); // Database config file

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        port: config.port,
        logging: config.logging,
    }
);

const models = {};


// Import models
models.Admin = require('./admin')(sequelize);
models.Sensor = require('./sensor')(sequelize);
models.AdminLogs = require('./adminLogs')(sequelize);
models.SensorLogs = require('./sensorLogs')(sequelize);
models.MaintenanceLogs = require('./maintenanceLogs')(sequelize);

// Setup associations
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
//models.Sequelize = Sequelize;

module.exports = models;
