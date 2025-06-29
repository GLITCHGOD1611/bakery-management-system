const Order = require('../models/order');

// GET /api/order/list
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// GET /api/order/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// POST /api/order/add
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order', details: error.message });
  }
};

// PUT /api/order/update/:id
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update order', details: error.message });
  }
};

// DELETE /api/order/delete/:id
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
