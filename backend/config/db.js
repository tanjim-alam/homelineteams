const mongoose = require('mongoose');

/**
 * Establish a connection to MongoDB using Mongoose
 */
async function connectDatabase() {
	const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://multitanentcrm:Tm09%40123@cluster0.symdr6d.mongodb.net/homelineteam';
	try {
		mongoose.set('strictQuery', true);
		await mongoose.connect(mongoUri, {
			// Keep options minimal; Mongoose 8 handles defaults well
		});
		// eslint-disable-next-line no-console
		console.log(`MongoDB connected: ${mongoose.connection.host}`);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('MongoDB connection error:', error.message);
		process.exit(1);
	}
}

module.exports = connectDatabase;


