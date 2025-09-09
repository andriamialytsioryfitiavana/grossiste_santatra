const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Get all invoices
router.get('/', invoiceController.getAllInvoices);

// Create a new invoice
router.post('/', invoiceController.createInvoice);

module.exports = router;