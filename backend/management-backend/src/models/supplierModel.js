const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Supplier = sequelize.define('Supplier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactInfo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'suppliers',
    timestamps: true,
});

// Method to create a new supplier
Supplier.createSupplier = async (supplierData) => {
    return await Supplier.create(supplierData);
};

// Method to get all suppliers
Supplier.getAllSuppliers = async () => {
    return await Supplier.findAll();
};

// Method to get a supplier by ID
Supplier.getSupplierById = async (id) => {
    return await Supplier.findByPk(id);
};

// Method to update a supplier
Supplier.updateSupplier = async (id, supplierData) => {
    return await Supplier.update(supplierData, {
        where: { id },
    });
};

// Method to delete a supplier
Supplier.deleteSupplier = async (id) => {
    return await Supplier.destroy({
        where: { id },
    });
};

module.exports = Supplier;