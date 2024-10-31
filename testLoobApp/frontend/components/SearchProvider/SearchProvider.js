import React, { useState, useEffect } from 'react';
import './SearchProvider.css';
import axios from 'axios';

const SearchProvider = () => {
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://testLoobApp-backend.cloud-stacks.com/api/search-providers', {
        params: { specialty, location, availability },
        headers: { 'Content-Type': 'application/json' }
      });
      setProviders(response.data);
      setError('');
    } catch (err) {
      setError('An error occurred while searching for providers.');
    }
  };

  const handleBookAppointment = async (providerId) => {
    try {
      const response = await axios.post(`https://testLoobApp-backend.cloud-stacks.com/api/book-appointment/${providerId}`, {
        date: availability
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Appointment booked successfully.');
      setError('');
    } catch (err) {
      setError('An error occurred while booking the appointment.');
    }
  };

  return (
    <div className="search-provider">
      <header className="header">
        <div className="logo">LoobApp</div>
        <nav className="navigation">
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </nav>
      </header>
      <div className="content">
        <div className="tabs">
          <button>Search</button>
          <button>Providers</button>
          <button>Appointments</button>
        </div>
        <div className="search-form">
          <label>
            Specialty:
            <input type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
          </label>
          <label>
            Location:
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          </label>
          <label>
            Availability:
            <input type="date" value={availability} onChange={(e) => setAvailability(e.target.value)} />
          </label>
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="provider-list">
          {providers.map(provider => (
            <div className="provider" key={provider.id}>
              <div className="provider-details">
                <h3>{provider.name}</h3>
                <p>{provider.specialty}</p>
                <p>{provider.location}</p>
              </div>
              <button onClick={() => handleBookAppointment(provider.id)}>View Availability</button>
              <button onClick={() => handleBookAppointment(provider.id)}>Book Appointment</button>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <ul>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>Help & Support</li>
        </ul>
      </footer>
    </div>
  );
};

export default SearchProvider;
