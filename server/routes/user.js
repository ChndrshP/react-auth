import {Router} from 'express';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config';
import {User} from '../model';
import userMiddleware from '../middleware/user';

const router = Router();

//User Routes
router.post('/signup', userMiddleware, async(req, res) => {
    // User signup 
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

router.post('/signin', userMiddleware, async(req, res) => {
    // User signup 
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

router.get('/profile', userMiddleware, async(req, res) => {
    // User profile
    try {
        const user = await User.findOne({ 
            username: req.username
        });

        if (user) {
            res.json({ user });
        } else {
            res.status(404).json({
                message: 'User not found' 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching user profile', error: error.message 
        });
    }
});

export default router;