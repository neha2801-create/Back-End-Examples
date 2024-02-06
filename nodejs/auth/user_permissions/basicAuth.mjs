//Middleware to check user is logged in
function authUser(req, res, next) {
  if (req.user == null) {
    res.status(403)
    return res.send('You need to sign in')
  }

  next()
}

//Middleware to check user authorization
function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401)
      return res.send('Not allowed')
    }
    
    next()
  }
}

export {authUser, authRole}