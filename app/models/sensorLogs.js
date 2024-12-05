const { Model, DataTypes } = require('sequelize');

class SensorLogs extends Model {
    static associate(models) {
        SensorLogs.belongsTo(models.Sensor, { foreignKey: 'sensor_id', as: 'sensor' });
    }
}

module.exports = (sequelize) => {
    SensorLogs.init({
        sensor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        detected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'SensorLogs',
        tableName: 'sensor_logs',
        timestamps: false,
    });

    return SensorLogs;
};
