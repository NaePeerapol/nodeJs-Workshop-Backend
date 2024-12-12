const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Product = require('../models/product.model');

const createOrder = async (req, res) => {
    try {
        const { buyerName, items } = req.body;

        let totalPrice = 0;
        if (!Array.isArray(items)) {
            res.status(400).json({ error: error.message });
        }

        for (let item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                throw new Error(`Product ${product.productName} not found`);
            }

            if (product.amount < item.quantity) {
                throw new Error(`Insufficient stock for product ${product.productName}`);
            }

            item.itemTotal = product.price * item.quantity;
            totalPrice += item.itemTotal;

            product.amount -= item.quantity;
            await product.save();
        }

        const order = new Order({
            buyerName,
            items,
            totalPrice
        });
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('items.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('items.product');

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
};