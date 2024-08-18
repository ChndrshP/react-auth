const {JWT_SECRET} = require("../config")
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

    if(!token){
        return res.status(401).json({
            message: "No Authorization header provided"
        });
    }

    if(words.length !== 2 || words[0] !== "Bearer"){
        return res.status(401).json({
            message: "Incorrect Authorization format"
        });
    }

    if(!jwtToken){
        return res.status(401).json({
            message: "No Authorization token provided"
        });
    }

    if(decodedValue.username){
        req.username = decodedValue.username;
        req.randomData =  "kjdssdkjfns";
        next();
    }else{
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }
}

module.exports = userMiddleware;