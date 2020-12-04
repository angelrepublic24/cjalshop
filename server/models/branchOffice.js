var mongoose = require('mongoose');
const { unique } = require('underscore');
var Schema = mongoose.Schema;

var branchOfficeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la sucursal es obligatorio'],
        unique: true
    },
    company: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
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
})


module.exports = mongoose.model('BranchOffice', branchOfficeSchema)