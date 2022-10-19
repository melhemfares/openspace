const User = require('../models/User')
const Schedule = require('../models/Schedule')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const decode = require('jwt-decode')

const register = async (req, res) => {
  //Creates user given the provided field values and signs token
  const user = await User.create({...req.body})
  const token = user.createJWT()

  const decoded = decode(token)
  req.body.createdBy = decoded.userId

  //Creates empty schedule for the new user
  const schedule = await Schedule.create(req.body)

  if(!schedule) {
    throw new BadRequestError('Schedule could not be created')
  }

  //Server responds with user payload
  res.status(StatusCodes.CREATED).json({ user:{name:user.fname}, token })
}

const login = async (req, res) => {
  //Check for missing fields
  const { email, password } = req.body
  if(!email || !password) {
    throw new BadRequestError('Email and/or password missing')
  }

  //Check database to see if email exists
  const user = await User.findOne({ email })
  if(!user) {
    throw new UnauthenticatedError('The provided email does not exist')
  }

  //Compare password to see if it matches
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect) {
    throw new UnauthenticatedError('The provided password is incorrect')
  }     
  
  //If all checks pass, token is signed and server responds with user payload
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user:{name:user.fname}, token })
}

module.exports = {
  register,
  login
}