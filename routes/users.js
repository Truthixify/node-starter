const express = require('express')
const CryptoJS = require('crypto-js')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

const router = express.Router()

// UPDATE A USER DETAILS
router.put('/:id', authMiddleware, async (req, res) => {
  const hashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC).toString()
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name
      }
    }, {new: true}).select('-password')

    res.status(200).send(user)
  }catch(ex) {
    res.status(500).send(ex)
  }
})


// CHANGE USER ROLE
router.put('/role/:id', authMiddleware, roleMiddleware(["su_admin"]), async (req, res) => {
  if(req.query.role === "") return res.status(400).send("The role is empty.") 

  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        role: req.query.role
      }
    }, {new: true}).select('-password')
    res.status(200).send(user)
  }catch(ex) {
    res.status(500).send(ex)
  }

})

// GIVE USER PERMISSIONS
router.post("/permissions/:id", authMiddleware, roleMiddleware(["su_admin"]), async(req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        permissions: [...req.user.permissions, ...req.body.permissions]
      }
    }, {new: true}).select("-password")
    res.status(200).send(user)
  } catch(ex) {
    res.status(500).send(ex)
  }
})


// GET A USER
router.get('/:id', authMiddleware, roleMiddleware(["su_admin", "mod"]), async (req, res) => {
  try {
    const checkUser = await User.findOne({name: req.body.name})
    if(!checkUser) return res.status(400).send('User does not exist.')

    const user = await User.findById(req.params.id).select('-password')
    res.status(200).send(user)
  }catch(ex) {
    res.status(500).send(ex)
  }
})

// GET ALL USERS
router.get('/', authMiddleware, roleMiddleware(["su_admin", "mod"]), async (req, res) => {
  try {
    const users = await User.find().sort('name').select('-password')
    res.status(200).send(users)
  }catch(ex) {
    res.status(500).send(ex)
  }
})

module.exports = router