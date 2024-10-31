// File type: Controller
const Payment = require('../models/Payment');

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving payments' });
  }
};

const downloadInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findByPk(id);
    if (payment && payment.invoiceAvailable) {
      // Logic to handle invoice download
      res.json({ message: `Invoice for payment ID ${id} is being downloaded.` });
    } else {
      res.status(404).json({ error: 'Invoice not available for this payment ID' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while downloading the invoice' });
  }
};

module.exports = {
  getAllPayments,
  downloadInvoice,
};
