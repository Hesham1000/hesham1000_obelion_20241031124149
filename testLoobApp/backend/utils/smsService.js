const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('testLoobApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true
  },
  phone: {
    type: DataTypes.STRING(20),
    unique: true
  },
  socialMedia: {
    type: DataTypes.STRING(255)
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'users', // matches the table name in database
  timestamps: false
});

class SMSService {
  static async sendVerificationSMS(phone, message) {
    try {
      // Simulated SMS sending logic
      console.log(`Sending verification SMS to ${phone}: ${message}`);
      return { success: true, message: 'SMS sent successfully.' };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { success: false, message: 'Failed to send SMS.' };
    }
  }
}

module.exports = { SMSService, User };