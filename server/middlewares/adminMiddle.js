import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    try{
        const decoded_value = jwt.verify(jwtToken, JWT_SECRET);
        if(decoded_value.username){
            next();
        }else{
            req.sign(403)({
                msg: "You are not authenticated"
            })
        }
    } catch(e){
        res.json({
            msg:"Incorrect inputs"
        })
    }  
}

export default adminMiddleware;