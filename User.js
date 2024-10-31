// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Username is required and unique
    password: { type: String, required: true }, // Password is required
    role: { type: String, enum: ['agent', 'buyer', 'renter'], default: 'buyer' }, // Role with a default value
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }] // Array of favorite properties referencing the Property model
});

// Exporting the User model
module.exports = mongoose.model('User', userSchema);
