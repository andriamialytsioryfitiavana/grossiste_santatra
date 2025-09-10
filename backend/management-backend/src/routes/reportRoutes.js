const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Get sales report
router.get('/sales', reportController.getSalesReport);

// Get inventory report
router.get('/inventory', reportController.getInventoryReport);

module.exports = router;