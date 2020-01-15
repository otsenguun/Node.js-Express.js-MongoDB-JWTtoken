// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    m_user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
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
    }

});
// Export Contact model
var Customer = module.exports = mongoose.model('customer', customerSchema);
module.exports.get = function (callback, limit) {
    Customer.find(callback).limit(limit);
}