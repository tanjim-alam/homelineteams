const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const { uploadProduct, debugUpload } = require('../middlewares/upload.middleware');
const { authenticate, requireAdmin } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', controller.getProducts);
router.get('/:slug', controller.getProductBySlug);

// Admin routes (require authentication and admin role)
router.post('/', authenticate, requireAdmin, debugUpload, uploadProduct, controller.createProduct);
router.put('/:id', authenticate, requireAdmin, debugUpload, uploadProduct, controller.updateProduct);
router.delete('/:id', authenticate, requireAdmin, controller.deleteProduct);

module.exports = router;


