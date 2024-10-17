const express = require('express')
const Role = require('../models/Role')
const router = express.Router()

const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

// ROUTE TO CREATE A ROLE
router.post('/create', authMiddleware, roleMiddleware(["su_admin", "mod"]), async (req, res) => {
    try {
        const role = await Role.findOne({name: req.body.name})
        if(role) return res.status(400).send('Role already exists.')

        const newRole = new Role({ ...req.body })
        await newRole.save()
        res.status(201).send('Role created successfully.')
    } catch (ex) {
        res.status(400).send(ex)
    }
})

// ROUTE TO DELETE A ROLE
router.delete("/delete", authMiddleware, roleMiddleware(["su_admin", "mod"]), async (req, res) => {
    try {
        const role = await Role.findOne({name: req.body.name})
        if(!role) return res.status(400).send('Nothing to delete, role does not exist.')

        await Role.findOneAndDelete({name: req.body.name})
        res.status(200).send("The role has been deleted.")
    } catch(ex) {
        res.status(500).send(ex)
    }
})

module.exports = router