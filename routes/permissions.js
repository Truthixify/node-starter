const express = require('express')
const Role = require('../models/Permission')
const router = express.Router()

const authMiddleware = require('../middleware/auth')
const permissionMiddleware = require('../middleware/permission')
const roleMiddleware = require('../middleware/role')
const Permission = require('../models/Permission')

// ROUTE TO CREATE A NEW PERMISSION
router.post('/create', authMiddleware, roleMiddleware(["su_admin"]), async (req, res) => {
    try {
        const permission = await Permission.findOne({name: req.body.name})
        if(permission) return res.status(400).send('Permission already exists.')

        const newPermission = new Permission({ ...req.body })
        await newPermission.save()
        res.status(201).send('Permission created successfully.')
    } catch (ex) {
        res.status(400).send(ex)
    }
})

// ROUTE TO DELETE A PERMISSION
router.delete("/delete", authMiddleware, roleMiddleware(["su_admin"]), async (req, res) => {
  try {
        const permission = await Permission.findOne({name: req.body.name})
        if(!permission) return res.status(400).send('Nothing to delete, permission does not exist.')

        await Permission.findOneAndDelete({name: req.body.name})
        res.status(200).send("The permission has been deleted.")
  } catch(ex) {
    res.status(500).send(ex)
  }
})

module.exports = router