const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

//Grabs all existing users, used for admin purposes probably
const getAllUsers = async (req, res) => {
  const users = await User.find({ }).sort('createdAt')
  res.status(StatusCodes.OK).json({ users })
}

//Grabs one user based on ID
const getUser = async (req, res) => {
  const user = await User.findById({
    _id: req.user.userId
  })

  if(!user) {
    throw new NotFoundError(`No user that belongs to ${userId}`)
  }

  res.status(StatusCodes.OK).json({ user })
}

//Updates the user in the case of a profile edit
const updateUser = async (req, res) => {
  const {
    body: { fname, lname, email, password },
    user: { userId }
  } = req

  if (fname === '' || lname === '' || email === '' || password === '') {
    throw new BadRequestError('Missing fields')
  }

  const user = await User.findByIdAndUpdate(
    { _id: userId },
    req.body,
    { new: true, runValidators: true }
  )

  if(!user) {
    throw new NotFoundError('Event could not be added')
  }

  res.status(StatusCodes.OK).json({ user })
}

//Deletes the user from the database
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove({
    _id: req.user.userId
  })

  if(!user) {
    throw new NotFoundError('Event could not be deleted')
  }

  res.status(StatusCodes.OK).json({ user })
}

const addFriend = async (req, res) => {
  //Check if friend code exists
  const friend = await User.findOne({
    friendCode: req.body.friendCode
  })

  if(!friend) {
    throw new NotFoundError('Invalid friend code. Try again.')
  }

  //Make sure the user isn't adding themselves
  const _user = await User.findById({
    _id: req.user.userId
  })

  if(_user.friendCode === req.body.friendCode) {
    throw new BadRequestError('You are already your own friend. Try someone else.')
  }

  //Make sure the user isn't adding the same person twice
  _user['friends'].forEach(_friend => {
    if(_friend.id == friend.id) {
      throw new BadRequestError(`You already added ${friend.fname} as a friend.`)
    }
  })

  //Once the checks pass, update the friend list
  const user = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    { $push: { friends: { name: (friend.fname + ' ' + friend.lname), id: friend._id } } },
    { new: true }
  )

  res.status(StatusCodes.OK).json({ user })
}

const deleteFriend = async (req, res) => {
  const {
    user: { userId },
    params: { id: friendId }
  } = req

  //Check if friend exists and extract ObjectID (string ID does not work)
  const friend = await User.findById({
    _id: friendId
  })

  if(!friend) {
    throw new NotFoundError(`No friend by id: ${friendId}`)
  }

  //Once the checks pass, update the friend list
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { friends: { id: friend._id } } },
    { new: true }
  )

  if(!user) {
    throw new NotFoundError('User could not be deleted')
  }

  res.status(StatusCodes.OK).json({ user })
}

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
}