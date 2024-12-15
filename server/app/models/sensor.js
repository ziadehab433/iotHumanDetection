const { Model, DataTypes } = require('sequelize');

class Sensor extends Model {
    static associate(models) {
        Sensor.belongsTo(models.Admin, { foreignKey: 'admin_id' });
        Sensor.hasMany(models.SensorLogs, { foreignKey: 'sensor_id' });
        Sensor.hasMany(models.MaintenanceLogs, { foreignKey: 'sensor_id', as: 'maintenanceLogs' });
        Sensor.hasMany(models.AdminLogs, { foreignKey: 'sensor_id', as: 'adminLogs' });
    }
}

module.exports = (sequelize) => {
    Sensor.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        location: {
            type: DataTypes.GEOMETRY,
            allowNull: false,
        },
        admin_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        status: {
            type: DataTypes.CHAR(255),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Sensor',
        tableName: 'sensor',
        timestamps: false,
    });

    return Sensor;
};
