const express = require('express');
const router = express.Router();
const { createOrder, 
        getAllOrders, 
        getOrderById } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);

module.exports = router;
