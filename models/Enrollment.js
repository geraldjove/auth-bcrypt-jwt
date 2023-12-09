const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
	// fields to collect
	// fields' rules
	enrolledCourses: [
		{
			courseId:{
				type: String,
				required: [true, 'Course ID is required']
			}
		}
	],
	totalPrice: {
		type: Number,
		required: [true, 'totalPrice is Required']
	},
	enrolledOn: {
		type: Date,
		default: Date.now // current date
	},
	status:{
		type: String,
		default: "Enrolled"
	}
})
// Model - to integrate the schema
module.exports = mongoose.model("Enrollment", enrollmentSchema);
