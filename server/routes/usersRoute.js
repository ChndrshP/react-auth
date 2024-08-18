const { Router } = require("express");
const router = Router();
//const userMiddleware = require("../middlewares/userMiddle");
const { User} = require("../model/schema");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken")

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

module.exports = router
