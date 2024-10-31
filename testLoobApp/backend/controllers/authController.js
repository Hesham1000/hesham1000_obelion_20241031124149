const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('testLoobApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

async function registerUser(req, res) {
  const { email, phone, socialMedia, password } = req.body;

  if (!email && !phone && !socialMedia) {
    return res.status(400).json({ error: 'Please provide at least one method of registration.' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      phone,
      socialMedia,
      password: hashedPassword
    });

    if (email) {
      console.log('Verification email sent to', email);
    } else if (phone) {
      console.log('Verification SMS sent to', phone);
    }

    return res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred during registration.', details: error.message });
  }
}

module.exports = {
  registerUser
};