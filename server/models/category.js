var mongoose = require('mongoose');
const uniqueValidator =  require('mongoose-unique-validator')

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true, 'Description is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Category', categorySchema);