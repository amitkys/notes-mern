const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    // console.log(req.headers);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // console.log('token from utilities file', token); 
    
    if(!token){
        return res.status(400).send('token is not provided');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.status(403).send('token is not valid');
        }
        // console.log('user from utilities file', user);
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;