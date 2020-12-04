const mongoose = require('mongoose');
const uniqueValidator =  require('mongoose-unique-validator')
var Schema = mongoose.Schema;

var rolesValidators = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
}
var sexValidator = {
    values: ['male', 'female'],
    message: '{VALUE} no es un sexo valido'
}

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is require']
    },
    lname: {
        type: String,
        required: [true, 'The last name is require']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is require']
    },
    password: {
        type: String,
        required: [true, 'The password is require']
    },
    img: {
        type: String,
        required: false
    },
    birth: {
        type: Date
    },
    sex: {
        type: String,
        enum: sexValidator,
        default: 'male'
    },
    phone: {
        type: Number,
        required: [true, 'The phone is required']
    },
    country:{
        type: String,
        requide: false
    },
    city: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: rolesValidators,
        default: 'USER_ROLE'
    },
    status: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})

userSchema.methods.toJSON = function(){
    let users = this;
    let userObject = users.toObject();
    delete userObject.password
    return userObject
}

userSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})



module.exports = mongoose.model('User', userSchema)