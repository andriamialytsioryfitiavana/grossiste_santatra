const Product = require('../models/productModel');
const apiResponse = require('../utils/apiResponse');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return apiResponse.success(res, products, "Products retrieved successfully");
    } catch (error) {
        return apiResponse.serverError(res, "Error retrieving products");
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    // Accept both English and French field names to be user-friendly
    const b = req.body || {};
    const name = b.name ?? b.nom;
    const category = b.category ?? b.categorie;
    const price = b.price ?? b.prix;
    const stock = b.stock ?? b.quantite ?? 0;
    const status = b.status ?? b.etat ?? 'active';
    const description = b.description;
    const image = b.image ?? null;

    try {
        const newProduct = await Product.create({ name, category, price, stock, status, description, image });
        return apiResponse.created(res, newProduct, "Product created");
    } catch (error) {
        console.error('Error creating product:', error);
        return apiResponse.serverError(res, error?.message || "Error creating product");
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return apiResponse.notFound(res, "Product not found");
        }
        return apiResponse.success(res, product, "Product retrieved");
    } catch (error) {
        return apiResponse.serverError(res, "Error retrieving product");
    }
};

// Update a product
exports.updateProductById = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, stock, status, description, image } = req.body;
    try {
        const updatedProduct = await Product.update({ name, category, price, stock, status, description, image }, { where: { id } });
        if (updatedProduct[0] === 0) {
            return apiResponse.notFound(res, "Product not found");
        }
        return apiResponse.success(res, null, "Product updated successfully");
    } catch (error) {
        return apiResponse.serverError(res, "Error updating product");
    }
};
exports.updateProduct = exports.updateProductById;

// Delete a product
exports.deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.destroy({ where: { id } });
        if (deletedProduct === 0) {
            return apiResponse.notFound(res, "Product not found");
        }
        return apiResponse.success(res, null, "Product deleted successfully");
    } catch (error) {
        return apiResponse.serverError(res, "Error deleting product");
    }
};
exports.deleteProduct = exports.deleteProductById;