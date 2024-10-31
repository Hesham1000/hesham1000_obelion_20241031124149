const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming there's a database configuration file

class Appointment extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      providerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'providers',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
    }, {
      sequelize,
      modelName: 'Appointment',
      tableName: 'appointments',
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.Provider, { foreignKey: 'providerId', as: 'provider' });
  }
}

module.exports = Appointment;