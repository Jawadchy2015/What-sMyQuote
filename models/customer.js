const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    // Name is mandatory
    name: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true
    },
    
    // Email is mandatory and must be unique
    email: {
        type: String,
        required: [true, 'Customer email is required'],
        unique: true, // Ensures no two customers share the same email
        trim: true,
        lowercase: true, // Stores emails in a consistent format
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ] // Validates email format
    },

    // Phone is mandatory
    phone: {
        type: String,
        required: [true, 'Customer phone number is required'],
        trim: true
    }
}, {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;