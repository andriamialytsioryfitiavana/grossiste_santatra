const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const apiResponse = require('../utils/apiResponse');

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        return apiResponse.success(res, orders);
    } catch (error) {
        return apiResponse.serverError(res, 'Error fetching orders');
    }
};

// Create a new order
exports.createOrder = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        if (!productId || !quantity || quantity <= 0) {
            return apiResponse.badRequest(res, 'Invalid productId or quantity');
        }
        const product = await Product.findByPk(productId);
        if (!product) {
            return apiResponse.notFound(res, 'Product not found');
        }
        if (product.stock < quantity) {
            return apiResponse.badRequest(res, 'Insufficient stock');
        }
        const newOrder = await Order.create({ productId, quantity });
        // decrease stock
        product.stock = product.stock - quantity;
        await product.save();
        return apiResponse.created(res, newOrder, 'Order created');
    } catch (error) {
        return apiResponse.serverError(res, 'Error creating order');
    }
};

// Update an existing order
exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body;
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return apiResponse.notFound(res, 'Order not found');
        }
        // Restore previous stock for old product
        const oldProduct = await Product.findByPk(order.productId);
        if (oldProduct) {
            oldProduct.stock += order.quantity;
            await oldProduct.save();
        }
        // Validate new product and desired quantity
        const newProduct = await Product.findByPk(productId);
        if (!newProduct) {
            return apiResponse.notFound(res, 'Product not found');
        }
        if (!quantity || quantity <= 0) {
            return apiResponse.badRequest(res, 'Invalid quantity');
        }
        if (newProduct.stock < quantity) {
            return apiResponse.badRequest(res, 'Insufficient stock');
        }
        // Apply update
        order.productId = productId;
        order.quantity = quantity;
        await order.save();
        // Decrease stock from new product
        newProduct.stock -= quantity;
        await newProduct.save();
        return apiResponse.success(res, null, 'Order updated');
    } catch (error) {
        return apiResponse.serverError(res, 'Error updating order');
    }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return apiResponse.notFound(res, 'Order not found');
        }
        return apiResponse.success(res, order);
    } catch (error) {
        return apiResponse.serverError(res, 'Error fetching order');
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return apiResponse.notFound(res, 'Order not found');
        }
        // restore stock
        const product = await Product.findByPk(order.productId);
        if (product) {
            product.stock += order.quantity;
            await product.save();
        }
        await order.destroy();
        return apiResponse.success(res, null, 'Order deleted');
    } catch (error) {
        return apiResponse.serverError(res, 'Error deleting order');
    }
};