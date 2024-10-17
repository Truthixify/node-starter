const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Permission name is required"],
        unique: true
    }
})

module.exports = mongoose.model('Permission', permissionSchema)
