const mongoose = require('mongoose');

// --- 1. Sub-Schema for a single Bell Plan ---
// This defines the structure for "P1", "P2", etc. inside "Bell"
const bellPlanSchema = new mongoose.Schema({
    data: { type: Number, required: true },
    internationalMinutes1000: { type: Boolean, default: true }, // Renamed "1000 intern mins"
    canUsCallingText: { type: Boolean, default: false }, // Renamed "CA/US call/Text"
    usRoam: { type: Boolean, default: false },
    usMxRoam: { type: Boolean, default: false },
    dataShare: { type: Boolean, default: false },
    speed: {
        type: String,
        enum: ['5G', '5G+'],
        default: '5G+'
    },
    // This will store prices as an array: [line1, line2, line3]
    price: {
        type: [Number],
        default: []
    }
}, { _id: false }); // _id: false - these are embedded, not standalone documents

// --- 2. Sub-Schema for a single Virgin Plan ---
const virginPlanSchema = new mongoose.Schema({
    data: { type: Number, required: true },
    internationalMinutes1000: { type: Boolean, default: false },
    caUsCallingText: { type: Boolean, default: false },
    usRoam: { type: Boolean, default: false },
    usMxRoam: { type: Boolean, default: false },
    minutes200: { type: Boolean, default: false }, // Renamed "200-min"
    dataShare: { type: Boolean, default: false },
    speed: {
        type: String,
        enum: ['5G', '4G'],
        default: '4G'
    },
    price: {
        type: [Number],
        default: []
    }
}, { _id: false });

// --- 3. Sub-Schema for a single Lucky Plan ---
const luckyPlanSchema = new mongoose.Schema({
    data: { type: Number, required: true },
    price: { type: Number, required: true},
    bonusData: { type: Number, default: 0 },
    caUsCalling: { type: Boolean, default: false } // Renamed "CA/US"
}, { _id: false });


// --- 4. The Main Plan Model ---
// This schema assumes you will have ONE document in the 'plans' collection
// that holds all the BYOD plan information.
const planSchema = new mongoose.Schema({
    // The top-level key you requested
    BYOD: {
        Bell: {
            // This says "Bell" will be an object (a Map) where
            // keys ("P1", "P2", etc.) map to a value
            // that MUST follow the 'bellPlanSchema' structure.
            type: Map,
            of: bellPlanSchema,
            default: {}
        },
        Virgin: {
            type: Map,
            of: virginPlanSchema,
            default: {}
        },
        Lucky: {
            type: Map,
            of: luckyPlanSchema,
            default: {}
        }
    }
    // You could add other top-level keys here later, like "Financing"
    // Financing: { ... }
}, {
    timestamps: true
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;