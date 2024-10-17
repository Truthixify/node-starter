const express = require('express')
const Simple = require('../models/Simple')

const router = express.Router()

// CREATE A NEW SIMPLE
router.post('/create', async(req, res) => {
  const simpleV = await Simple.findOne({ key: req.body.key })

  if(simpleV) return res.status(400).send("Simple with the key already exists")

    try {
      const simple = new Simple({ ...req.body })

      await simple.save()

      res.status(200).send(simple)
    } catch(ex) {
      res.status(500).send(ex)
    }
})

// EDIT A SAMPLE
router.put('/edit/:id', async(req, res) => {
  try {
    const simple = await Simple.findById(req.params.id)
    if(!simple) return res.status(404).send('Simple not found and cannot be updated')
    
    try {
      const simple = await Simple.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {new: true})

      res.status(200).send(simple)
    } catch(ex) {
      res.status(500).send(ex)
    }
  } catch(ex) {
    res.status(500).send(ex)
  }
})


// GET ALL SIMPLE
router.get("/", async(req, res) => {
  try {
    const simples = await Simple.find().sort('key')

    res.status(200).send(simples)
  } catch(ex) {
    res.status(500).send(ex)
  }
})

// GET A SIMPLE BY ID
router.get('/:id', async(req, res) => {
  try {
    const simple = await Simple.findById(req.params.id)
    if(!simple) return res.status(404).send('Simple not found')

    res.status(200).send(simple)
  } catch (ex) {
    res.status(500).send(ex)
  }
})

// DELETE A SIMPLE
router.delete('/delete/:id', async(req, res) => {
  try {
    await Simple.findByIdAndDelete(req.params.id)
    res.status(200).send('Simple has been deleted')
  }catch(ex) {
    res.status(500).send(ex)
  }
})

module.exports = router