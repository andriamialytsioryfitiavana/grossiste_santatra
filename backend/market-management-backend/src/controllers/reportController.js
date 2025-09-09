const Report = require('../models/reportModel');

// Get sales report
exports.getSalesReport = async (req, res) => {
    try {
        const salesReport = await Report.getSalesData();
        res.status(200).json({
            success: true,
            data: salesReport
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get inventory report
exports.getInventoryReport = async (req, res) => {
    try {
        const inventoryReport = await Report.getInventoryData();
        res.status(200).json({
            success: true,
            data: inventoryReport
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};