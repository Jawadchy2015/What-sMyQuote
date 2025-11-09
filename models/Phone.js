const mongoose = require('mongoose');

// --- Reusable Sub-schemas for Pricing ---
// This keeps the main schema cleaner.

// Bell Pricing Schema
const bellPricingSchema = new mongoose.Schema({
    Elite: { type: Number, default: 0 },
    Ultimate: { type: Number, default: 0 },
    deviceReturnOption: { type: Number, default: 0 } // Converted "Device Return Option"
}, { _id: false }); // _id: false stops MongoDB from creating unique IDs for this sub-object

// Virgin Pricing Schema
const virginPricingSchema = new mongoose.Schema({
    sweetpay: { type: Number, default: 0 },       // Converted "Sweetpay"
    sweetpayLite: { type: Number, default: 0 }    // Converted "Sweetpay lite"
}, { _id: false });


// --- Main Phone Schema ---
const phoneSchema = new mongoose.Schema({
    manufacturer: {
        type: String,
        required: [true, 'Manufacturer is required'],
        trim: true
    },
    model: {
        type: String, // String is best (e.g., "17 Pro", "S25 Ultra", "Pixel 9")
        required: [true, 'Model is required'],
        trim: true
    },

    // --- Pricing Object ---
    price: {
        deviceRetailPrice: { type: Number, default: 0 },
        bellConsumer: bellPricingSchema,
        bellSMB: bellPricingSchema,
        virgin: virginPricingSchema,
        dfEligible: { type: Boolean, default: true }
    },

    // --- Eligibility Flags ---
    eligibleForHUG: {
        type: Boolean,
        default: true
    },

    // --- Trade-In Object ---
    tradeInBonus: {
        tradeInBonus: { type: Boolean, default: false },
        
        // Interpreted {str} as an array of strings for eligible device names
        eligibleTradeInDevices: {
            type: [String],
            default: [] // Defaults to an empty array
        }
    },

    // --- Features Object ---
    features: {
        storage: { type: Number }, // e.g., 128, 256, 512
        
        // Interpreted {string} as an array of strings for colors
        colors: { 
            type: [String], 
            default: [] // e.g., ["Blue", "Black", "Titanium"]
        },
        battery: { type: Number }, // e.g., 4422 (in mAh)
        
        noOfBackCamera: { type: Number }, // e.g., 3
        
        // Based on your example: {"48mp ultrawide", "48MP telephoto"}
        backCameraLensSpec: {
            type: [String],
            default: []
        },
        screenSize: { type: Number } // e.g., 6.1, 6.7
    }

}, {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true
});

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;