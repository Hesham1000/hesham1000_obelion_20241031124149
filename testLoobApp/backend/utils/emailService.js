const nodemailer = require('nodemailer');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('testLoobApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  doctor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  tableName: 'appointments',
  timestamps: false
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

async function sendEmail(to, subject, text) {
  try {
    let info = await transporter.sendMail({
      from: '"Appointment Reminder" <your-email@gmail.com>',
      to,
      subject,
      text
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
}

module.exports = {
  sendEmail,
  Appointment
};