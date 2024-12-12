const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    gender: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);
