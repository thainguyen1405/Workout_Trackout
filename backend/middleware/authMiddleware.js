const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  let token;

  if(req.cookies.token){
    token = req.cookies.token
  }
  else if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){ // mobile
    token = req.headers.authorization.split(' ')[1]
  }

  if(!token){
    return res.status(401).json({ message: 'no token' })
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  }
  catch(err){
    return res.status(401).json({ message: 'token invalid or expired' })
  }
}

module.exports = protect
