const jwt = require('jsonwebtoken'); //add access to jsonwebstoken
require('dotenv').config(); //add access to hidden environment variable.s PLS REMOVE IF NOT NEEDED.

// Create an access token to be assigned for each user.
module.exports.createAccessToken = (user) => {
    // payload. Data containing the necessary document you'd like to include to the access token.
    let data = {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    // jwt sign (payload, secret key, options (optional))
    // return the parameters to be signed by JWT method sign
    return jwt.sign(data, process.env.SECRET_KEY, {});
}

// verify token (request, response, next)
module.exports.verifyToken = (req,res,next) => {
    // check and retrieve JWT Authorization. JWT header consists of 3 parts (3 parts: headers, payload, signature)
    token = req.headers.authorization;
    // checks the type of token
    if(typeof token === 'undefined'){
        return res.send('Error Token'); //if token is undefined or null then send Error Token
    } else{
        // remove bearer string inside token
        token = token.slice(7, token.length)
        // jwt decode token. Passes the token and uses the secret for authentication. Send the result as a decodedToken
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) =>{
            if(err){
                return res.send('Error decoding token');
            } else {
                req.user = decodedToken; //if no errors, assign the decoded token to the req.user
                next(); //pass to the next middleware or route handler.
            }
        })
    }
}

// verify if Admin true
module.exports.verifyAdmin = (req, res, next) => {
    if(req.user.isAdmin){ //if Admin is true
        next(); //pass to the next middleware or route handler.
    } else {
        return res.send('Error not admin');
    }
}