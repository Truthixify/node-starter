module.exports = (requiredRoles) => {
  return (req, res, next) => {
    try {
      const role = req.user.role
      if(!requiredRoles.includes(role))  return res.status(403).send('User is forbidden.')

      next()
    } catch (ex) {
      res.status(500).send(ex)
    } 
  }
}
