// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
    isdel:{
        type:Number,
        default:0
    },
    m_user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    m_customer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer'
    },
   
    info:[{
            name:{
                type: String,
                default:""
            }
        }
    ]

});
// Export Contact model
var Product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}