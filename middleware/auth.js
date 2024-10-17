const jwt = require('jsonwebtoken')

module.exports = function verifyToken(req, res, next) {
  try {
    const token = req.header('x-auth-token')

    if(!token) return res.status(401).send('Provide a token')

    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.user = decoded

    next()
  }catch(ex) {
    res.status(401).send('Invalid token')
  }
}