const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');
const { authenticate, requireAdmin } = require('../middlewares/auth.middleware');

router.post('/', controller.createOrder);
router.get('/', authenticate, requireAdmin, controller.getOrders);
router.get('/:id', authenticate, requireAdmin, controller.getOrderById);

module.exports = router;


