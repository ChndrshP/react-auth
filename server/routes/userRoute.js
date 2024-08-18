import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { User } from "../model/schema.js";
import { Router } from "express";

// Initilize express router
const router = Router();


// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username: username,
        password: password
    })
    res.json({
        messasge : "User Created Successfully"
    })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })
    if(user){
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        res.json({
            token
        })
    }else{
        res.status(411).json({
            message: "Incorrect Credentials"
        })
    }
});

export default router;
