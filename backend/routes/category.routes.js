const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const { uploadCategory } = require('../middlewares/upload.middleware');

const { authenticate, requireAdmin } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', controller.getCategories);
router.get('/:slug', controller.getCategoryBySlug);
router.get('/id/:id', controller.getCategoryById);
router.get('/:slug/filter-options', controller.getCategoryFilterOptions);

// Admin routes (require authentication and admin role)
router.post('/', authenticate, requireAdmin, uploadCategory, controller.createCategory);
router.put('/:id', authenticate, uploadCategory, controller.updateCategory);
router.delete('/:id', authenticate, requireAdmin, controller.deleteCategory);
router.post('/:categoryId/fields', authenticate, requireAdmin, controller.addCustomField);
router.post('/:categoryId/variant-fields', authenticate, requireAdmin, controller.addVariantField);

module.exports = router;


