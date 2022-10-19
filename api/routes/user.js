const express = require('express')

const router = express.Router()

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../controllers/user')

router.route('/all')
  .get(getAllUsers)

router.route('/')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

router.route('/friends')
  .patch(addFriend)

router.route('/friends/:id')
  .patch(deleteFriend)

module.exports = router