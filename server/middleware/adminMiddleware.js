import {JWT_SECRET} from '../config';
import jwt from 'jsonwebtoken'

function adminMiddleware(req, res, next){
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    try{
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        if(decodedValue.username){
            next();
        }else{
            req.sign(403)({
                message: "Access denied: Invalid token"
            })
        }
    }catch(e){
        res.status(401).json({
            message: "Token verification failed"
        })
    }
}

export default adminMiddleware;