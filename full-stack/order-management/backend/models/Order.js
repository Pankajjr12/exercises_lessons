
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
        unique: true
    },

    customer: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    product: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ["Electronics", "Fashion"],
        required: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    status: {
        type: String,
        enum: ["Delivered", "Pending", "Cancelled"],
        default: "Pending"
    },

    date: {
        type: String,
        required: true
    }

});

// Indexes
orderSchema.index({ customer: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ category: 1 });

module.exports = mongoose.model("Order", orderSchema);
