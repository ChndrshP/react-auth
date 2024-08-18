import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { Admin } from "../model/schema.js";
import { Router } from "express";

// Initilize express router
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password,
        isAdmin: true
    })
    res.json({
        message: "Admin created successfully"
    })
});

router.post('/login', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    console.log(JWT_SECRET);
    

    const user = await User.find({
        username,
        password
    })
    if (user) {
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(411).json({
            message: "Incorrect credentials"
        })
    }

});

export default router;