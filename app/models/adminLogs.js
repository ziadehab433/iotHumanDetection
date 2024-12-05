const { Model, DataTypes } = require('sequelize');

class AdminLogs extends Model {
    static associate(models) {
        AdminLogs.belongsTo(models.Admin, { foreignKey: 'admin_id' });
        AdminLogs.belongsTo(models.Sensor, { foreignKey: 'sensor_id' });
    }
}

module.exports = (sequelize) => {
    AdminLogs.init({
        sensor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        action: {
            type: DataTypes.CHAR(255),
            allowNull: false,
            defaultValue: 'update',
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'AdminLogs',
        tableName: 'admin_logs',
        timestamps: false,
    });

    return AdminLogs;
};
