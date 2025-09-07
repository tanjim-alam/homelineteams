const Order = require('../models/Order');

// Create order (guest checkout)
exports.createOrder = async (req, res, next) => {
	try {
		const { 
			customer, 
			items, 
			total, 
			subtotal, 
			shipping, 
			tax, 
			paymentMethod, 
			paymentDetails 
		} = req.body;
		
		if (!customer || !items || !Array.isArray(items) || !items.length) {
			return res.status(400).json({ message: 'Invalid order payload' });
		}
		
		if (!paymentMethod) {
			return res.status(400).json({ message: 'Payment method is required' });
		}

		// For COD orders, set payment status as pending
		// For other payment methods, simulate payment processing
		let paymentStatus = 'pending';
		let finalPaymentDetails = paymentDetails || {};

		if (paymentMethod === 'cod') {
			paymentStatus = 'pending';
		} else {
			// Simulate successful payment for demo purposes
			paymentStatus = 'paid';
			finalPaymentDetails = {
				transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
				paymentGateway: paymentMethod === 'card' ? 'razorpay' : 'razorpay',
				paidAt: new Date(),
				...paymentDetails
			};
		}

		const orderData = {
			customer,
			items,
			total,
			subtotal: subtotal || total,
			shipping: shipping || 0,
			tax: tax || 0,
			paymentMethod,
			paymentStatus,
			paymentDetails: finalPaymentDetails
		};

		const order = await Order.create(orderData);
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

// Update order status
exports.updateOrderStatus = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		
		if (!status) {
			return res.status(400).json({ message: 'Status is required' });
		}
		
		const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
		if (!validStatuses.includes(status)) {
			return res.status(400).json({ message: 'Invalid status' });
		}
		
		const order = await Order.findByIdAndUpdate(
			id, 
			{ status }, 
			{ new: true, runValidators: true }
		);
		
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}
		
		res.json(order);
	} catch (err) {
		next(err);
	}
};


