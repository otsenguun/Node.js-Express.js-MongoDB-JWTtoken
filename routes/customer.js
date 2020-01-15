var express = require('express');
var router = express.Router();

// Import customer controller
var customerController = require('../Controller/customerController');


// Customer routes

router.route('/customers')
    .get(customerController.index)
    .post(customerController.new);
router.route('/customers/:customer_id')
    .get(customerController.view)
    .patch(customerController.update)
    .put(customerController.update)
    .delete(customerController.delete);

    module.exports = router;