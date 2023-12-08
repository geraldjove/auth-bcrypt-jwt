const jwt = require('jsonwebtoken'); //add access to jsonwebstoken
require('dotenv').config();

// creat an access token
module.exports.createAccessToken = (user) => {
    // payload
    let data = {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    // jwt sign (payload, secret, option)
    return jwt.sign(data, process.env.SECRET_KEY, {});
}

// verify token (request, response, next)
module.exports.verifyToken = (req,res,next) => {
    // check jwt headers (3 parts: headers, payload, signature)
    token = req.headers.authorization;
    // checks the type of token
    if(typeof token === 'undefined'){
        return res.send('Error Token');
    } else{
        // remove bearer string inside token
        token = token.slice(7, token.length)
        // jwt decode token. Passes the token and uses the secret for authentication. Send the result as a decodedToken
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) =>{
            if(err){
                return res.send('Error decoding token');
            } else {
                req.user = decodedToken;
                next();
            }
        })
    }
}

// verify if Admin true
module.exports.verifyAdmin = (req, res, next) => {
    if(req.user.isAdmin){
        next();
    } else {
        return res.send('Error not admin');
    }
}