const express = require('express')
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("/dist"))


// ROUTES IMPORT
const simpleRoute = require("./routes/simple")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const roleRoute = require("./routes/roles")
const permissionRoute = require("./routes/permissions")
const productRoute = require("./routes/products")

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

app.use("/api/simple", simpleRoute)
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/roles", roleRoute)
app.use("/api/permissions", permissionRoute)
app.use("/api/products", productRoute)

app.get("/", async(req, res) => {
  res.status(200).send("Hello")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})