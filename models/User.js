
//CREATING MODELS: ALWAYS REMEMBER STRUCTURE: SCHEMA THEN MODEL!

const mongoose = require('mongoose');

const Schema = mongoose.Schema; //assign Schema variable for mongoose.Schema (schematics/blueprint)

// create a new Schema and assign it to a variable (userController).
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

module.exports = mongoose.model('User', userController); //exports model so it can be used by other modules.