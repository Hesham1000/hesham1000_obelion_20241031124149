import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    if (!email && !phone && !socialMedia) {
      setError('Please provide at least one method of registration.');
      return;
    }
    setError('');

    try {
      const response = await axios.post('https://testLoobApp-backend.cloud-stacks.com/api/register', {
        email,
        phone,
        socialMedia,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccessMessage(response.data.message);
      if (email) {
        await axios.post('https://testLoobApp-backend.cloud-stacks.com/api/sms/sendVerification', {
          email,
        });
      } else if (phone) {
        await axios.post('https://testLoobApp-backend.cloud-stacks.com/api/sms/sendVerification', {
          phone,
        });
      }
    } catch (error) {
      setError(error.response ? error.response.data.error : 'An error occurred during registration.');
    }
  };

  return (
    <div className="register-container">
      <header>
        <h1>User Registration</h1>
      </header>
      <div className="register-form">
        <div className="form-field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Phone Number</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Social Media Account</label>
          <input type="text" value={socialMedia} onChange={(e) => setSocialMedia(e.target.value)} />
        </div>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button onClick={handleRegister}>Register</button>
      </div>
      <footer>
        <div className="additional-links">
          <a href="/terms-and-conditions">Terms and Conditions</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
        <div className="footer-links">
          <a href="/help">Help</a>
          <a href="/contact-us">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default Register;
