module.exports = (requiredPermissions) => {
  return (req, res, next) => {
    try {
      const permissions = req.user.permissions
      const hasPermission = permissions.some(permission => requiredPermissions.includes(permission.name));
      if (!hasPermission) {
          return res.status(403).send("User does not have the required permission.")
      }

      next()
    } catch (ex) {
      res.status(500).send(ex)
    } 
  }
}