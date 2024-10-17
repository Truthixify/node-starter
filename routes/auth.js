const express = require('express')
const User = require('../models/User')
const CryptoJS = require('crypto-js')

const router = express.Router()

//CREATE A NEW USER
router.post('/register', async (req, res) => {
    const userName = await User.findOne({username: req.body.username})
    if(userName) return res.status(400).send('User already exists. Please login')

    const userEmail = await User.findOne({email: req.body.email})
    if(userEmail) return res.status(400).send('User already exists. Please login')

    const hashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC).toString()

    try {
        const user = new User({...req.body, password: hashedPassword, role: "user"})
        await user.save()
        const {password, ...others} = user._doc

        res.status(200).send(others)

    }catch(ex) {
        res.status(500).send(ex)
    }

})

//LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) return res.status(400).send('Invalid Login Credentials')
    
        const originalPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SEC).toString(CryptoJS.enc.Utf8)
        if(originalPassword !== req.body.password) return res.status(400).send('Invalid Login Credentials')

        const token = user.generateAuthToken()
    
        const {password, ...others} = user._doc

        res.header('x-auth-token', token).status(200).send({...others, token})
    }catch(ex) {
        res.status(500).send(ex)
    }
})

module.exports = router
