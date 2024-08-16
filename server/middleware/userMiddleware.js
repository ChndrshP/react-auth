import {JWT_SECRET} from '../config.js';
import jwt from 'jsonwebtoken';
import {User} from '../model/userSchema.js';

function userMiddleware(req, res, next){
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

    if(!token){
        return res.status(401).json({
            message: "Authorization header is missing"
        });
    }
    if(words.length !== 2 || words[0] !== "Bearer"){
        return res.status(401).json({
            message: "Invalid authorization format. Expected format: 'Bearer <token>'"
        });
    }
    if(!jwtToken){
        return res.status(401).json({
            message:"No Authorization token provided"
        });
    }

    try{
        if(decodedValue.username){
            req.username = decodedValue.username;
            next();
        }else{
            res.status(403).json({
                message: "Access denied: Invalid token"
            });
        }
    }catch(e){
        res.status(401).json({
            message: "Token verification failed"
        });
    }
}

export default userMiddleware;