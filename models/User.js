const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userController = new Schema({
    firstName: {
        type: String,
        required: [true, "Required first name"]
    },
    lastName: {
        type: String,
        required: [true, "Required last name"]
    },
    email: {
        type: String,
        required: [true, "Required email"]
    },
    password: {
        type: String,
        required: [true, "Required password"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    mobileNo: {
        type: String,
        required: [true, "Required mobile number"]
    },
})

module.exports = mongoose.model('User', userController);