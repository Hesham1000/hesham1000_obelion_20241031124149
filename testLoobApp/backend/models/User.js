const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt'); // Make sure bcrypt is imported
const sequelize = new Sequelize('testLoobApp', 'root', 'root', {
  host: 'db', // Changed from 'localhost' to 'db'
  port: 3306,
  dialect: 'mysql'
});

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isNumeric: true,
        }
      },
      socialMedia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    });
  }
}

User.init(sequelize);

module.exports = User;