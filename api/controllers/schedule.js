const Schedule = require('../models/Schedule')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

//Grabs all existing schedules, used when comparing schedules to friends
const getAllSchedules = async (req, res) => {
  const user = await User.findById({
    _id: req.user.userId
  })

  let friendList = [req.user.userId]

  const friends = await user['friends'].forEach(friend => {
    friendList.push(friend.id)
  })

  const schedules = await Schedule.find({ 
    createdBy: { $in: friendList } 
  })
  res.status(StatusCodes.OK).json({ schedules })
}

//Grabs the schedule of the logged user
const getSchedule = async (req, res) => {
  const schedule = await Schedule.findOne({
    createdBy: req.user.userId
  })

  if(!schedule) {
    throw new NotFoundError(`No schedule that belongs to ${userId}`)
  }

  res.status(StatusCodes.OK).json({ schedule })
}

//Updates the schedule whenever an event is created
const addEvent = async (req, res) => {
  const {
    body: { day, title, start, end, id },
    user: { userId }
  } = req

  if (day === '' || title === '' || start === '' || end === '' || id === '') {
    throw new BadRequestError('Missing fields')
  }

  const schedule = await Schedule.findOneAndUpdate(
    { createdBy: userId },
    { $push: { events: req.body } },
    { new: true }
  )

  if(!schedule) {
    throw new NotFoundError('Event could not be added')
  }

  res.status(StatusCodes.OK).json({ schedule })
}

//Deletes an event inside the schedule based on its ID
const deleteEvent = async (req, res) => {
  const {
    user: { userId },
    params: { id: eventId }
  } = req

  const schedule = await Schedule.findOneAndUpdate(
    { createdBy: userId },
    { $pull: { events: { id: eventId } } },
    { new: true }
  )

  if(!schedule) {
    throw new NotFoundError('Event could not be deleted')
  }

  res.status(StatusCodes.OK).json({ schedule })
}

//Updates the schedule whenever an event is created
//(essentially just a 'delete old, add new' method)
const updateEvent = async (req, res) => {
  const {
    body: { day, title, start, end, id },
    user: { userId },
    params: { id: eventId }
  } = req

  if (day === '' || title === '' || start === '' || end === '' || id === '') {
    throw new BadRequestError('Missing fields')
  }

  const deleteEvent = await Schedule.findOneAndUpdate(
    { createdBy: userId },
    { $pull: { events: { id: eventId } } },
    { new: true }
  )

  if(!deleteEvent) {
    throw new NotFoundError(`Event with id ${eventId} does not exist`)
  }

  const schedule = await Schedule.findOneAndUpdate(
    { createdBy: userId },
    { $push: { events: req.body } },
    { new: true }
  )

  if(!schedule) {
    throw new NotFoundError('Event could not be deleted')
  }
  
  res.status(StatusCodes.OK).json({ schedule })
}

//Clears entire schedule so you don't have to delete one-by-one
const clearSchedule = async (req, res) => {
  const {
    user: { userId }
  } = req

  const schedule = await Schedule.findOneAndUpdate(
    { createdBy: userId },
    { $set: { events: [] } },
    { new: true }
  )
   
  if(!schedule) {
    throw new NotFoundError('Schedule could not be deleted')
  }

  res.status(StatusCodes.OK).json({ schedule })
}

module.exports = {
  getAllSchedules,
  getSchedule,
  addEvent,
  deleteEvent,
  updateEvent,
  clearSchedule
}