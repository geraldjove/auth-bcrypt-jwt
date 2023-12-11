const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const Enrollment = require('../models/Enrollment');

module.exports.registerUser = (req, res) => {
	if (req.body.password.length < 8){
		return res.status(400).send(false);
	}
	let newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		// bcrypt.hashSync is to hide the actual password
		password: bcrypt.hashSync(req.body.password, 10),
		isAdmin: req.body.isAdmin,
		mobileNo: req.body.mobileNo
	})
	return newUser.save()
	.then((user) => res.status(201).send({ message: "Registered Successfully"}))
	.catch((error)=>res.send(false))
}

module.exports.loginUser = (req, res) => {
	return User.findOne({email: req.body.email})
	.then(result => {
		if(result == null){
			return res.status(404).send({ error: "No Email Found" });
		}
		else{
			// verify password
			// Syntax: bcrypt.compareSync(userInput, bcryptedPasswordFromDatabase)
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password); // true or false
			
			if (isPasswordCorrect == true) {
				// if the password matches, it will create/generate a token
				return res.status(200).send({ access : auth.createAccessToken(result)})
			} else {
				// if the password does not match it should response that it does not match "Email and/or password do not match"
				return res.status(401).send({ message: "Email and/or password do not match" });
			}
		}
	})
}

// Retrieve all users (for admin only)
module.exports.getAllUsers = (req, res) => {
	return User.find({})
	.then(result => {
		res.status(200).send({result});
	})
}

module.exports.getProfile = (req, res) => {
	// Debugging: Print the received user ID
	console.log(req.user.id)
	return User.findById(req.user.id)
	.then((user) => {
		if (!user) {
			// console.log('result not found in the database');
			return res.status(404).send({ message: 'User not found' });
		} else {
			if(req.user.id === req.body._id){
				user.password = '';
				// console.log('User found:', user);
				return res.status(200).send(user);
			} else {
				return res.send('Error invalid user and token')
			}
		}
		
		
	})
	.catch(error => {
		console.error('Error while finding user:'+  error);
		res.status(500).send({ message: 'Find failed'+ error });
	});
};

module.exports.getEnrollments = (req, res) => {
	console.log(req.user.id);
	
	return Enrollment.findOne({ userId: req.user.id })
	.then((result) => {
		if (result) {
			res.send({ result });
		} else {
			res.send({ error: 'Enrollment not found' });
		}
	})
	.catch((error) => {
		res.status(500).send({ error: 'Internal Server Error' });
	});
};

module.exports.enroll = (req,res) => {
	console.log(req.user.isAdmin)
	if(req.user.isAdmin == true){
		res.send(false)
	} else { 
		let newEnrollee = new Enrollment({
			userId: req.user.id,
			enrolledCourses: req.body.enrolledCourses,
			totalPrice: req.body.totalPrice
		})
		return newEnrollee.save()
		.then((enrolledStudent) => {
			return res.send({enrolledStudent})
		})
		.catch((error)=>res.send(error.message))
	}
	
}
