const express = require('express')
const Product = require('../models/Product')
// const multer = require('multer')
const fs = require('fs')
const path = require('path')

const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

const router = express.Router()

//UPLOAD Product IMAGE
// router.post('/upload', upload.single('image'), (req, res) => {
//   res.status(200).send(req.file)
// })

// CREATE A PRODUCT
router.post('/create', authMiddleware, roleMiddleware(["su_admin", "admin", "mod"]), async (req, res) => {
  const product = await Product.findOne({ title: req.body.title })
  if(product) return res.status(400).send('The  product already exists')

  try {
    const product = new Product({...req.body})
    await product.save()

    res.status(200).send(product)
  }catch(ex) {
    res.status(500).send(ex)
  }
})

// UPDATE A PRODUCT
router.put('/edit/:id', authMiddleware, roleMiddleware(["su_admin", "admin", "mod"]), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if(!product) return res.status(404).send('Product not found and cannot be updated')
  
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {new: true})
  
      res.status(200).send(product)
    }catch(ex) {
      res.status(500).send(ex)
    }
  }catch {
    res.status(500).send(ex)
  }
  
})

// DELETE A PRODUCT
router.delete('/delete/:id', authMiddleware, roleMiddleware(["su_admin", "admin", "mod"]), async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).send('The Product has been deleted')
  }catch(ex) {
    res.status(500).send(ex)
  }
})

// GET A PRODUCT
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if(!product) return res.status(404).send("Product doesn't exist")
  
    res.status(200).send(product)
  }catch(ex) {
    res.status(500).send(ex)
  }
})

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const categoryParams = req.query.category
    const titleParams = req.query.title
    const authorParams = req.query.author

    let products

    if(categoryParams && titleParams && authorParams) products = await Product.find({
      category: categoryParams,
      title: titleParams,
      author: authorParams
    }).sort('-createdAt')
    else if(categoryParams && titleParams) products = await Product.find({
      category: categoryParams,
      title: titleParams
    }).sort('-createdAt')
    else if(categoryParams && authorParams) products = await Product.find({
      category: categoryParams,
      author: authorParams
    }).sort('-createdAt')
    else if(titleParams && authorParams) products = await Product.find({
      title: titleParams,
      author: authorParams
    }).sort('-createdAt')
    else if(categoryParams) products = await Product.find({category: {
      $in: [categoryParams]
    }}).sort('-createdAt')
    else if(titleParams) products = await Product.find({title: titleParams}).sort('-createdAt')
    else if(authorParams) products = await Product.find({author: authorParams}).sort('-createdAt')
    else products = await Product.find().sort('-createdAt')

    res.status(200).send(products)
  }catch(ex) {
    res.status(500).send(ex)
  }
})

module.exports = router