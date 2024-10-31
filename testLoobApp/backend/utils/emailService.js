```js
const nodemailer = require('nodemailer');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('testLoobApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    unique: true
  },
  socialMedia: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Your verification code is: ${verificationCode}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

module.exports = {
  sendVerificationEmail,
  User
};