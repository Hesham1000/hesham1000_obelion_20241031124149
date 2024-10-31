const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('testLoobApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

// Define User model
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
  tableName: 'users',
  timestamps: false
});

router.post('/register', async (req, res) => {
  const { email, phone, socialMedia, password } = req.body;

  if (!email && !phone && !socialMedia) {
    return res.status(400).json({ error: 'Please provide at least one method of registration.' });
  }

  try {
    // Create new user
    const newUser = await User.create({ email, phone, socialMedia, password });
    console.log('User registered with:', newUser);

    if (email) {
      console.log('Verification email sent to', email);
    } else if (phone) {
      console.log('Verification SMS sent to', phone);
    }

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;