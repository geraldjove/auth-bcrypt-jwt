const jwt = require("jsonwebtoken");

const secret = ""; //Add secret key

module.exports.createAccessToken = (user) => {
	// payload
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	return jwt.sign(data, secret, {});
}

// function to verify the token
module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;
    if(typeof token === "undefined"){
        return res.send({ auth: "Failed. No Token" });
    } else {
        //console.log(token);	
        // Removes the "Bearer " string 	
        token = token.slice(7, token.length);

        //console.log(token);

        jwt.verify(token, secret, function(err, decodedToken){
            if(err){
                return res.send({
                    auth: "Failed",
                    message: err.message
                });

            } else {
            	// console.log("result from verify method:")
                // console.log(decodedToken);
                req.user = decodedToken;
                next();	
            }
        })
    }
};

// Verify if the user is an admin
module.exports.verifyAdmin = (req, res, next) => {
	if(req.user.isAdmin){
		next();
	} else {
		return res.status(403).send({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}
}




