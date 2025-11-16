// models/NewCust.js
const mongoose = require('mongoose');

const newCustSchema = new mongoose.Schema(
  {
    // Phone section: provider, numLines, numPhones, phoneChoice, selectedCustomer, etc
    phoneSection: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    // Plan section: all the flags (5G, US Roam, etc.)
    planSection: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    // Add-On section: SPC, DF/line, trade-in, etc.
    addOnSection: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    // Optional: store full state if you want absolutely everything
    rawState: {
      type: mongoose.Schema.Types.Mixed,
    },

    // Optional: quick references for easier querying later
    selectedCustomer: {
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
      name: String,
      email: String,
      phone: String,
    },

    selectedPhones: [
      {
        phoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Phone' },
        label: String,
        qty: Number,
      },
    ],

    meta: {
      createdAtClient: String, // whatever you passed from frontend
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt
  }
);

const NewCust = mongoose.model('NewCust', newCustSchema);

module.exports = NewCust;
