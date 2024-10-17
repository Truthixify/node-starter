const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        default: "user"
    }
})

module.exports = mongoose.model('Role', roleSchema)
