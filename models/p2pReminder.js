const mongoose = require('mongoose');

const p2pReminderSchema = new mongoose.Schema({
    TransactionDate: {
        type: Date,
		required: [true],
        default: Date.now // Defaults to the exact moment it's created
    },
    ReminderDate: {
        type: Date
        // Default is handled by the pre-save hook below
    },
    CustomerInfo: {
        // This creates the link to your 'Customer' collection
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Must match the name you used in mongoose.model('Customer', ...)
        required: [true, 'Customer Info is required for the reminder']
    },
    Notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// --- Mongoose "Pre-Save" Hook ---
// This function runs *before* a document is saved to the database
p2pReminderSchema.pre('save', function(next) {
    // 'this' refers to the document being saved
    
    // Only set the default ReminderDate if one hasn't been provided manually
    if (!this.ReminderDate) {
        // Create a new date object based on the TransactionDate
        const reminder = new Date(this.TransactionDate);
        
        // Add 28 days (4 weeks)
        reminder.setDate(reminder.getDate() + 28);
        
        this.ReminderDate = reminder;
    }
    
    // Continue to the 'save' operation
    next();
});

const P2PReminder = mongoose.model('P2PReminder', p2pReminderSchema);

module.exports = P2PReminder;