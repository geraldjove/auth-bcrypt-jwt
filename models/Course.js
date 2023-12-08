//CREATING MODELS: ALWAYS REMEMBER STRUCTURE: SCHEMA THEN MODEL!

const mongoose = require('mongoose');

// create a new Schema and assign it to a variable (courseShema).
const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Course name is Required"]
	},
	description: {
		type: String,
		required: [true, "Course description is Required"]
	},
	price: {
		type: Number,
		required: [true, "Course price is Required"]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model("Course", courseSchema); //exports model so it can be used by other modules.