const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// Get all orders
router.get('/', orderController.getAllOrders);

// Get order by ID
router.get('/:id', orderController.getOrderById);

// Add new order
router.post('/', orderController.createOrder);

// Update order
router.put('/:id', orderController.updateOrder);

// Delete order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
