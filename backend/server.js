const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDatabase = require('./config/db');
const { configureCloudinary } = require('./utils/cloudinary');
const { uploadProduct, debugUpload, uploadCategory } = require('./middlewares/upload.middleware');

// Routes
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

// Middlewares
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');

const app = express();

// Security & misc
app.use(helmet());

// CORS configuration - more explicit for credentials
const corsOptions = {
	origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'],
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
	exposedHeaders: ['Set-Cookie'],
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(morgan('dev'));

// Skip body parsing for multipart/form-data requests
app.use((req, res, next) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    console.log('Skipping body parsing for multipart/form-data request');
    return next();
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic rate limits for auth endpoints
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// Health check
app.get('/api/health', (req, res) => {
	return res.json({ ok: true, service: 'homelineteam-backend', timestamp: new Date().toISOString() });
});

// CORS test endpoint
app.get('/api/cors-test', (req, res) => {
	res.json({
		message: 'CORS is working!',
		origin: req.get('origin'),
		credentials: req.get('cookie') ? 'Cookies present' : 'No cookies',
		timestamp: new Date().toISOString()
	});
});

// File upload test endpoint
app.post('/api/test-upload', debugUpload, uploadProduct, (req, res) => {
	console.log('=== TEST UPLOAD DEBUG ===');
	console.log('Files received:', req.files);
	console.log('Body received:', req.body);
	
	res.json({
		message: 'Upload test successful',
		files: req.files ? Object.keys(req.files) : 'No files',
		body: req.body
	});
});

// Environment check endpoint
app.get('/api/env-check', (req, res) => {
	res.json({
		cloudinary: {
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
			api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
			api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing'
		},
		node_env: process.env.NODE_ENV || 'Not set',
		port: process.env.PORT || 'Default (5000)'
	});
});

// API routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// 404 and error handlers
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDatabase().then(() => {
	configureCloudinary();
	app.listen(PORT, () => {
		// eslint-disable-next-line no-console
		console.log(`Server running on port ${PORT}`);
		console.log(`CORS enabled for origins: ${corsOptions.origin.join(', ')}`);
		console.log(`Credentials: ${corsOptions.credentials}`);
	});
});


