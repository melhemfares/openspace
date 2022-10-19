const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const referralCode = require('referral-codes')

var Schema = mongoose.Schema

const UserSchema = new Schema({
  fname: {
    type: String,
    required:[true, 'First name missing'],
    maxlength:[20, 'First name is too long']
  },
  lname: {
    type: String,
    required:[true, 'Last name missing'],
    maxlength:[20, 'Last name is too long']
  },
  email: {
    type: String,
    required:[true, 'Email missing'],
    match:[
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Please provide a valid email'
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password missing'],
    minlength: [8, 'Password is too short']
  },
  friends: {
    type: [Schema.Types.Mixed]
  },
  friendCode: {
    type: String
  }
})

UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

  this.friendCode = referralCode.generate({
    length: 8,
    count: 1
  })[0]
  next()
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({userId:this._id, name:this.name}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  })
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)