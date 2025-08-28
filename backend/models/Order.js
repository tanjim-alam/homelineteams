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
		status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);


