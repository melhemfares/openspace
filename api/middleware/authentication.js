const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = (req, res, next) => {
  //check Authorization header for token
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No authorization header')
  }
  
  //split header text into two and grab token portion
  const token = authHeader.split(' ')[1]

  //verify token signature
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    req.user = { userId:payload.userId, name:payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Token is present but is invalid')
  }
}

module.exports = auth