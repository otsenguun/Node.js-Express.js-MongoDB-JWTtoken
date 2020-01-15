// contactController.js
// Import contact model
Product = require('../Model/productModel');
// Handle index actions
exports.index = function (req, res) {
    Product.get(function (err, products) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Products retrieved successfully",
            data: products
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    // console.log(JSON.parse(req.body.info));
    var info = JSON.parse(req.body.info)
    var product = new Product();
    product.name = req.body.name ? req.body.name : product.name;
    product.info = info.info
    product.m_user = req.user._id;
    product.m_cus = req.body.m_cus;

     // product.info = product.info.concat({token})
// save the contact and check for errors
    product.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New product created!',
            data: product
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            message: 'Product details loading..',
            data: product
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
product.name = req.body.name ? req.body.name : product.name;
// save the contact and check for errors
        product.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Product Info updated',
                data: product
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Product.remove({
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Product deleted'
        });
    });
};