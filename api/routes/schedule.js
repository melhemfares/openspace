const express = require('express')

const router = express.Router()

const {
  getAllSchedules,
  getSchedule,
  addEvent,
  deleteEvent,
  updateEvent,
  clearSchedule
} = require('../controllers/schedule')

router.route('/')
  .get(getSchedule)
  .post(addEvent)
  .delete(clearSchedule)

router.route('/:id')
  .delete(deleteEvent)
  .patch(updateEvent)
  
router.route('/all')
  .get(getAllSchedules)

module.exports = router