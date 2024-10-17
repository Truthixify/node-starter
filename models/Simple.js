const mongoose = require("mongoose")

const simpleSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  key: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  }
})

module.exports = mongoose.model("Simple", simpleSchema)