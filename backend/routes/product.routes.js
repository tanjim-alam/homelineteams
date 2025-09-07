const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const { uploadProduct, debugUpload } = require('../middlewares/upload.middleware');
const { authenticate, requireAdmin } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', controller.getProducts);
router.get('/:slug', controller.getProductBySlug);

// Admin routes (require authentication and admin role)
// Temporarily removed auth for debugging
router.post('/', debugUpload, uploadProduct, controller.createProduct);
router.put('/:id', debugUpload, uploadProduct, controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

// Test route for debugging uploads
router.post('/test-upload', debugUpload, uploadProduct, (req, res) => {
    console.log('=== TEST UPLOAD DEBUG ===');
    console.log('Files:', req.files);
    console.log('Body:', req.body);
    res.json({ 
        message: 'Upload test successful', 
        files: req.files,
        body: req.body 
    });
});

module.exports = router;


