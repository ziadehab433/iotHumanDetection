const { Model, DataTypes } = require('sequelize');

class Admin extends Model {
    static associate(models) {
        Admin.hasMany(models.Sensor, { foreignKey: 'admin_id'});
        Admin.hasMany(models.AdminLogs, { foreignKey: 'admin_id' });
    }
}

module.exports = (sequelize) => {
    Admin.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        super: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Admin',
        tableName: 'admin',
        timestamps: false,
    });

    return Admin;
};
