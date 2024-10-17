const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [50, 'Username must be less than 50 characters']
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        ref: "Role",
        default: "user"
    },
    permissions: [{
        type: String,
        ref: "Permission"
    }]
}, {timestamps: true})

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({_id: this._id, role: this.role, permissions: this.permissions, username: this.username}, process.env.JWT_KEY, {
        expiresIn: "24h"
    })
}

module.exports = mongoose.model('User', userSchema)