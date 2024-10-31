import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentReminder.css';

function AppointmentReminder() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState({
    method: 'Email',
    time: '09:00',
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('https://testLoobApp-backend.cloud-stacks.com/api/appointments');
      const appointments = response.data;
      setUpcomingAppointments(appointments.filter(appt => new Date(appt.date) > new Date()));
      setPastAppointments(appointments.filter(appt => new Date(appt.date) <= new Date()));
    } catch (error) {
      console.error('Failed to fetch appointments', error);
    }
  };

  const handleConfirm = async (appointmentId) => {
    try {
      await axios.post(`https://testLoobApp-backend.cloud-stacks.com/api/appointments/${appointmentId}/confirm`);
      fetchAppointments();
    } catch (error) {
      console.error('Failed to confirm appointment', error);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await axios.delete(`https://testLoobApp-backend.cloud-stacks.com/api/appointments/${appointmentId}`);
      fetchAppointments();
    } catch (error) {
      console.error('Failed to cancel appointment', error);
    }
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setNotificationSettings({ ...notificationSettings, [name]: value });
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://testLoobApp-backend.cloud-stacks.com/api/notification-settings', notificationSettings, {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchAppointments();
    } catch (error) {
      console.error('Failed to save notification settings', error);
    }
  };

  return (
    <div className="notification-page">
      <header className="header">
        <button className="back-button">Back</button>
        <div className="logo">App Logo</div>
        <h1>Notifications</h1>
      </header>
      <nav className="navigation-tabs">
        <button>Upcoming</button>
        <button>Past</button>
        <button>Settings</button>
      </nav>
      <main className="main-content">
        <section className="upcoming-appointments">
          <h2>Upcoming Appointments</h2>
          {upcomingAppointments.map(appt => (
            <div key={appt.id} className="appointment-reminder">
              <p>Appointment with {appt.doctor}</p>
              <p>On {appt.date} at {appt.time}</p>
              <button className="confirm-button" onClick={() => handleConfirm(appt.id)}>Confirm</button>
              <button className="cancel-button" onClick={() => handleCancel(appt.id)}>Cancel</button>
            </div>
          ))}
        </section>
        <section className="past-appointments">
          <h2>Past Appointments</h2>
          {pastAppointments.map(appt => (
            <div key={appt.id} className="appointment-history">
              <p>Appointment with {appt.doctor}</p>
              <p>On {appt.date} at {appt.time}</p>
            </div>
          ))}
        </section>
        <section className="settings">
          <h2>Notification Settings</h2>
          <form onSubmit={handleSettingsSubmit}>
            <label>
              Preferred Method:
              <select name="method" value={notificationSettings.method} onChange={handleSettingsChange}>
                <option>Email</option>
                <option>SMS</option>
              </select>
            </label>
            <label>
              Reminder Time:
              <input type="time" name="time" value={notificationSettings.time} onChange={handleSettingsChange} />
            </label>
            <button type="submit">Save Settings</button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <a href="/profile">Profile</a>
        <a href="/home">Home</a>
        <p>&copy; 2023 Company Name. All rights reserved.</p>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </footer>
    </div>
  );
}

export default AppointmentReminder;
