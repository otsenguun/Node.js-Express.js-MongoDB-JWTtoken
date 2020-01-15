// contactController.js
// Import contact model
Customer = require('../Model/customerModel');
// Handle index actions
exports.index = function (req, res) {
    Customer.get(function (err, customers) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Customer retrieved successfully",
            data: customers
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    // console.log(JSON.parse(req.body.info));
    // var info = JSON.parse(req.body.info)
    var customer = new Customer();
    customer.name = req.body.name ? req.body.name : customer.name;
    customer.m_user = req.user._id;
// save the contact and check for errors
    customer.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New customer created!',
            data: customer
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Customer.findById(req.params.product_id, function (err, customer) {
        if (err)
            res.send(err);
        res.json({
            message: 'Customer details loading..',
            data: customer
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
Customer.findById(req.params.product_id, function (err, customer) {
        if (err)
            res.send(err);
customer.name = req.body.name ? req.body.name : customer.name;
// save the contact and check for errors
        customer.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Customer Info updated',
                data: customer
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Customer.remove({
        _id: req.params.product_id
    }, function (err, customer) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Customer deleted'
        });
    });
};