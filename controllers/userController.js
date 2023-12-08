const User = require('../models/User'); //connect to User model
const bcrypt = require('bcrypt'); //uses to encrypt passwords
const auth = require('../auth'); //use for authentication (required for user id with verifcation)

// Mask Password. Turns the password to 5 asterisk
const maskPassword = () =>{
    return '*'.repeat(5);
};

// Member 1 Task - Get User Details using user id.
module.exports.getProfile = (req, res) =>{
    // M1: Find the document using user id also using JWT Bearer Token. (JWT BEARER TOKEN (Create access token) IS INSIDE auth.js)
    return User.findOne({_id: req.user._id}) 
    .then((user, err)=>{
        if (err){
            return res.status(500).send('Error finding users.');
        }
        if (req.user._id === req.body._id){ // Check if input token id is equivalent to the req.body._id input
            // if true, return and print the document below to the client.
            return res.send({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                // M1: hide the user's password and return the result back to the frontend
                password: maskPassword(user.password), 
                isAdmin: user.isAdmin,
                mobileNo: user.mobileNo,
                __v: user.__v
            })
        } else {
            return res.send('Missing token or invalid user id'); //if false, missing token or invalid token.
        }
    })
    .catch(()=>{
        return res.send('No user found')
    })
}

//  Add users
module.exports.registerUser = (req, res) => {
    const { firstName, lastName, email, password, isAdmin, mobileNo } = req.body // Object deconstructs the req.body
    const hashedPassword = bcrypt.hashSync(password, 10); //use to hash the password
    const maskedPassword = maskPassword(password); // use for masking the password inside mongoDB
    return User.findOne({email: email}) //check if there is an existing email then return it to the client but not printed.
    .then((result)=>{
        // if result is true, then duplication is found.
        if(result){
            return res.send('Duplicated user found');
        } else {
            // if result is false, proceed to create a new User.
            let newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword, //use encrypted password.
                isAdmin: isAdmin,
                mobileNo: mobileNo
            })
            // save new user
            return newUser.save()
            .then((savedUser, err)=>{
                if(err){
                    return res.send('Error: User not registered.')
                } else{
                    return res.send({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: maskedPassword, //returns a masked password so the user won't see the actual or encrypted password.
                        isAdmin: isAdmin,
                        mobileNo: mobileNo
                    });
                }
            })
        }
    })
    .catch((err)=>console.log('Error: ',err))
}

module.exports.loginUser = (req, res) =>{
    const { email, password } = req.body; // Object deconstruct req.body
    return User.findOne({email: email}) //checks email inside users collection
    .then((result)=>{
        if (!result){
            // if false return this and print to the client.
            return res.send('No registered email found.')
        } else {
            // if true, check if password is correct and compare using bcrypt compareSynch
            const isPasswordCorrect = bcrypt.compareSync(password, result.password);
            if(isPasswordCorrect){
                return res.send({token: auth.createAccessToken(result)}); //creates a new access token each time the password is correct/initiated.
            } else {
                return res.send('Wrong Password')
            }
        }
    })
    // Catch error and send it to the client.
    .catch((err)=>{
        return res.send('Error: ', err)
    })
}
