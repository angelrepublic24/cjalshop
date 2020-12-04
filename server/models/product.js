const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    size: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'SubCategory'
    }
})
module.exports = mongoose.model('Product', productSchema)