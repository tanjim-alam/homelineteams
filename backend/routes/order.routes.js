const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');
const { authenticate, requireAdmin } = require('../middlewares/auth.middleware');

router.post('/', controller.createOrder);
router.get('/', controller.getOrders); // Remove auth for demo purposes
router.get('/:id', controller.getOrderById); // Remove auth for demo purposes
router.put('/:id', controller.updateOrderStatus); // Remove auth for demo purposes

module.exports = router;


