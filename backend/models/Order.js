const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
	{
		productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
		name: { type: String, required: true },
		price: { type: Number, required: true },
		quantity: { type: Number, required: true },
		selectedOptions: { type: mongoose.Schema.Types.Mixed }, // selected variant fields
		image: { type: String },
	},
	{ _id: false }
);

const orderSchema = new mongoose.Schema(
	{
		customer: {
			name: { type: String, required: true },
			email: { type: String },
			phone: { type: String },
			address: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: true },
			zip: { type: String, required: true },
			notes: { type: String },
		},
		items: [orderItemSchema],
		total: { type: Number, required: true },
		subtotal: { type: Number, required: true },
		shipping: { type: Number, default: 0 },
		tax: { type: Number, default: 0 },
		paymentMethod: { 
			type: String, 
			required: true, 
			enum: ['card', 'upi', 'netbanking', 'wallet', 'cod'] 
		},
		paymentStatus: { 
			type: String, 
			default: 'pending', 
			enum: ['pending', 'paid', 'failed', 'refunded'] 
		},
		paymentDetails: {
			transactionId: { type: String },
			paymentGateway: { type: String },
			paidAt: { type: Date }
		},
		status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] },
		orderNumber: { type: String, unique: true },
	},
	{ timestamps: true }
);

// Generate order number before saving
orderSchema.pre('save', async function(next) {
	if (!this.orderNumber) {
		const count = await this.constructor.countDocuments();
		this.orderNumber = `ORD-${String(count + 1).padStart(6, '0')}`;
	}
	next();
});

module.exports = mongoose.model('Order', orderSchema);


