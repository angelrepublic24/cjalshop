const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        required: [true, 'La categoria es obligatoria'],
        ref: 'Category'
    },
    img: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

})

module.exports = mongoose.model('Company', companySchema)