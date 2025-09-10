const Invoice = require('../models/invoiceModel');
const apiResponse = require('../utils/apiResponse');

// Create a new invoice
exports.createInvoice = async (req, res) => {
    const { orderId, amount } = req.body;

    try {
        const newInvoice = await Invoice.create({ orderId, amount });
        return apiResponse.created(res, newInvoice, 'Invoice created');
    } catch (error) {
        return apiResponse.error(res, 'Error creating invoice', error);
    }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.findAll();
        return apiResponse.success(res, invoices, 'Invoices retrieved');
    } catch (error) {
        return apiResponse.serverError(res, 'Error retrieving invoices');
    }
};
exports.getInvoices = exports.getAllInvoices;