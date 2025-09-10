const Supplier = require('../models/supplierModel');
const apiResponse = require('../utils/apiResponse');

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        return apiResponse.success(res, suppliers);
    } catch (error) {
        return apiResponse.serverError(res, 'Error fetching suppliers');
    }
};

// Get a supplier by ID
exports.getSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findByPk(id);
        if (!supplier) {
            return apiResponse.notFound(res, 'Supplier not found');
        }
        return apiResponse.success(res, supplier);
    } catch (error) {
        return apiResponse.serverError(res, 'Error fetching supplier');
    }
};

// Create a new supplier
exports.createSupplier = async (req, res) => {
    const { name } = req.body;
    try {
        const newSupplier = await Supplier.create({ name });
        return apiResponse.success(res, newSupplier, 'Supplier created');
    } catch (error) {
        return apiResponse.serverError(res, 'Error creating supplier');
    }
};

// Update a supplier
exports.updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const supplier = await Supplier.findByPk(id);
        if (!supplier) {
            return apiResponse.notFound(res, 'Supplier not found');
        }
        supplier.name = name;
        await supplier.save();
        return apiResponse.success(res, supplier, 'Supplier updated');
    } catch (error) {
        return apiResponse.serverError(res, 'Error updating supplier');
    }
};

// Delete a supplier
exports.deleteSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findByPk(id);
        if (!supplier) {
            return apiResponse.notFound(res, 'Supplier not found');
        }
        await supplier.destroy();
        return apiResponse.success(res, null, 'Supplier deleted');
    } catch (error) {
        return apiResponse.serverError(res, 'Error deleting supplier');
    }
};