const mongoose = require('mongoose');

// This defines the structure of a User in your database
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // No two users can have the same email
        lowercase: true,
    },
    password: {
        type: String,
        required: true, // This will be the *hashed* password
    }
});

// Create the model and export it
const User = mongoose.model('User', userSchema);
module.exports = User;