import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [16, "Name must be at most 16 characters long"],
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'guest'],
        default: 'user',
    },
}, {
    timestamps: true, 
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;