var mongoose = require('mongoose');
const uniqueValidator =  require('mongoose-unique-validator')

var Schema = mongoose.Schema;

var subCategorySchema = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true, 'Description is required'],
        
    },
    category:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
});

module.exports = mongoose.model('SubCategory', subCategorySchema)