const Order = require('../models/Order');

// Create order (guest checkout)
exports.createOrder = async (req, res, next) => {
	try {
		const { customer, items, total } = req.body;
		if (!customer || !items || !Array.isArray(items) || !items.length) {
			return res.status(400).json({ message: 'Invalid order payload' });
		}
		const order = await Order.create({ customer, items, total });
		res.status(201).json(order);
	} catch (err) {
		next(err);
	}
};

// Get order by id
exports.getOrderById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const order = await Order.findById(id);
		if (!order) return res.status(404).json({ message: 'Order not found' });
		res.json(order);
	} catch (err) {
		next(err);
	}
};

// List orders (basic; in real admin require auth)
exports.getOrders = async (req, res, next) => {
	try {
		const orders = await Order.find().sort({ createdAt: -1 });
		res.json(orders);
	} catch (err) {
		next(err);
	}
};


