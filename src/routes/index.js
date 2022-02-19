const express = require('express');
const router = express.Router();
const usersRouter = require('./users.route');
const checkoutRouter = require('./checkout.route');
const webHooksRouter = require('./webhooks.route');
const productsRouter = require('./products.route');

router.use('/users/', usersRouter);
router.use('/checkout',checkoutRouter);
router.use('/webhooks',webHooksRouter);
router.use('/products/', productsRouter);

module.exports = router;