import React, { useState, useEffect } from 'react';
import './PaymentHistory.css';
import axios from 'axios';

function PaymentHistory() {
  const [activeTab, setActiveTab] = useState('PastPayments');
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('https://testLoobApp-backend.cloud-stacks.com/api/payments');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const downloadInvoice = async (id) => {
    try {
      const response = await axios.get(`https://testLoobApp-backend.cloud-stacks.com/api/payments/${id}/invoice`);
      if (response.data.message) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error downloading invoice:', error);
    }
  };

  const renderPayments = () => (
    <div className="payment-list">
      {payments.map(payment => (
        <div key={payment.id} className="payment-item">
          <span>{payment.date}</span>
          <span>{payment.amount}</span>
        </div>
      ))}
    </div>
  );

  const renderInvoices = () => (
    <div className="invoice-list">
      {payments.filter(p => p.invoiceAvailable).map(payment => (
        <div key={payment.id} className="invoice-item">
          <span>{payment.date}</span>
          <span>{payment.amount}</span>
          <button onClick={() => downloadInvoice(payment.id)} className="download-button">Download Invoice</button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="payment-processing">
      <header>
        <h1>Payment Processing</h1>
        <nav>
          <ul>
            <li className={activeTab === 'PastPayments' ? 'active' : ''} onClick={() => handleTabChange('PastPayments')}>Past Payments</li>
            <li className={activeTab === 'Invoices' ? 'active' : ''} onClick={() => handleTabChange('Invoices')}>Invoices</li>
          </ul>
        </nav>
        <div className="top-links">
          <a href="#help">Help</a>
          <a href="#settings">Settings</a>
        </div>
      </header>
      <main>
        {activeTab === 'PastPayments' && renderPayments()}
        {activeTab === 'Invoices' && renderInvoices()}
      </main>
      <footer>
        <p>© 2023 Company Name. All rights reserved.</p>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms and Conditions</a>
      </footer>
    </div>
  );
}

export default PaymentHistory;
