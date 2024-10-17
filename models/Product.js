const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product title is required"]
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    ref: "User"
  },
  category: {
    type: Array
  },
  description: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)