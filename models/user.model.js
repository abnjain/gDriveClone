const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlenght: [3, "Username must be atleast 3 characters long"]
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlenght: [10, "Email must be atleast 10 characters long"]
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlenght: [5, "Password must be atleast 5 characters long"]
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;