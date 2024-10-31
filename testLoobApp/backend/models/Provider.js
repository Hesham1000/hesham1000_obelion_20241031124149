const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/connection'); // Assuming you have a connection file

class Provider extends Model {}

Provider.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Provider',
  tableName: 'providers',
  timestamps: false, // Disable timestamps
});

module.exports = Provider;