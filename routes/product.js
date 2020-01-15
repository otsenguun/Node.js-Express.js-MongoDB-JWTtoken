var express = require('express');
var router = express.Router();

// Import product controller
var productController = require('../Controller/productController');

// Product routes
router.route('/products')
    .get(productController.index)
    .post(productController.new);
router.route('/products/:product_id')
    .get(productController.view)
    .patch(productController.update)
    .put(productController.update)
    .delete(productController.delete);

module.exports = router;