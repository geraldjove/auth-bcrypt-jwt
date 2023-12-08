const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth');

// Mask Password
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
            // Check if input token is equivalent to the req.body._id input
        }
        
        if (req.user._id === req.body._id){
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
            return res.send('Missing token or invalid user id');
        }
    })
    .catch(()=>{
        return res.send('No user found')
    })
}

//  Add users
module.exports.registerUser = (req, res) => {
    const { firstName, lastName, email, password, isAdmin, mobileNo } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10);
    const maskedPassword = maskPassword(password);
    return User.findOne({email: email})
    .then((result)=>{
        if(result){
            return res.send('Duplicated user found');
        } else {
            let newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
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
                        password: maskedPassword,
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
    const { email, password } = req.body;
    return User.findOne({email: email})
    .then((result)=>{
        if (!result){
            
            return res.send('No registered email found.')
        } else {
            const isPasswordCorrect = bcrypt.compareSync(password, result.password);
            if(isPasswordCorrect){
                return res.send({token: auth.createAccessToken(result)});
            } else {
                console.log(result.password, password);
                return res.send('Wrong Password')
            }
        }
    })
    // Catch error and send it to the client.
    .catch((err)=>{
        return res.send('Error: ', err)
    })
}
