const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Database connection
const sequelize = new Sequelize('testLoobApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

// Load SQL file and execute it to ensure the table exists
const createAppointmentsTableSQL = fs.readFileSync(path.join(__dirname, '../../database/migrations/003_create_appointments_table.sql'), 'utf8');
sequelize.query(createAppointmentsTableSQL).catch(error => console.error('Error executing SQL:', error));

// Controller functions
module.exports = {
  getAppointments: async (req, res) => {
    try {
      const appointments = await sequelize.query('SELECT * FROM appointments', { type: Sequelize.QueryTypes.SELECT });
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  },

  createAppointment: async (req, res) => {
    try {
      const { doctor, date, time } = req.body;
      await sequelize.query('INSERT INTO appointments (doctor, date, time) VALUES (?, ?, ?)', {
        replacements: [doctor, date, time]
      });
      res.status(201).json({ message: 'Appointment created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const { doctor, date, time } = req.body;
      await sequelize.query('UPDATE appointments SET doctor = ?, date = ?, time = ? WHERE id = ?', {
        replacements: [doctor, date, time, id]
      });
      res.json({ message: 'Appointment updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update appointment' });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      await sequelize.query('DELETE FROM appointments WHERE id = ?', {
        replacements: [id]
      });
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete appointment' });
    }
  }
};