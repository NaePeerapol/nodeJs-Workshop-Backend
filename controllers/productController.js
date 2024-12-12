const Product = require('../models/product.model');
const fs = require('fs').promises;
const path = require('path');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { productName, productDetail, price, amount } = req.body;

        // จัดการ path ของรูปภาพ
        const productImage = req.file
            ? `images/${req.file.filename}`
            : '';

        const product = new Product({
            productName,
            productDetail,
            price: Number(price),
            amount: Number(amount),
            productImage
        });

        await product.save();

        res.status(201).json({
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        console.error('Create Product Error:', error);
        res.status(500).json({
            error: 'Error creating product',
            message: error.message
        });
    }
};

const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const updateData = {
            amount: Number(amount)
        };

        if (req.file) {
            updateData.productImage = `images/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        console.error('Update Product Error:', error);
        res.status(500).json({
            error: 'Error updating product',
            message: error.message
        });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};
