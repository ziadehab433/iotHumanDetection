const { Model, DataTypes } = require('sequelize');

class MaintenanceLogs extends Model {
    static associate(models) {
        MaintenanceLogs.belongsTo(models.Sensor, { foreignKey: 'sensor_id'});
    }
}

module.exports = (sequelize) => {
    MaintenanceLogs.init({
        sensor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'MaintenanceLogs',
        tableName: 'maintenance_logs',
        timestamps: true,
    });

    return MaintenanceLogs;
};
