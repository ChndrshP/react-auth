import mongoose from 'mongoose';
import { z } from 'zod';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model('User', userSchema);

// Define Zod schema for validation
const userValidationSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6),
});

// Validate user data before saving
userSchema.methods.validateUser = function () {
    userValidationSchema.parse(this.toObject());
};

export default User;