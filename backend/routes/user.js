const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel.js')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const protect = require('../middleware/authMiddleware.js')

dotenv.config()
const router = express.Router()

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' })
}

router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body

    console.log('login started')

    if(!email || !password){
      return res.status(400).json({ message: 'all fields are required' })
    }

    const user = await User.findOne({ email })
    if(!user){
      return res.status(401).json({ message: 'user does not exist' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword){
      return res.status(401).json({ message: 'incorrect password' })
    }

    const token = generateToken(user._id)

    // return token via cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000
    })

    // if on mobile and cant access cookies send in json
    if(req.headers['x-client'] === 'mobile'){
      res.json({ token })
    }

    console.log('login success')

    res.status(200).json({
      user: user,
      token: token
    })
  }
  catch(error){
    console.error('server error with user login: ', error)
    res.status(500).json({ message: 'user login failed' })
  }
})

router.post('/register', async (req, res) => {
  try{
    const { email, password } = req.body 

    console.log('register started')

    if(!email || !password){
      return res.status(400).json({ message: 'all fields are required' })
    }

    const user = await User.findOne({ email })
    if(user){
      return res.status(400).json({ message: 'user already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({
      email,
      password: hashedPassword,
    })

    const token = generateToken(newUser._id)

    // return token via cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000
    })

    // if on mobile and cant access cookies send in json
    if(req.headers['x-client'] === 'mobile'){
      res.json({ token })
    }

    console.log('register success')

    res.status(201).json({ 
      user: newUser,
      token: token
    })
  }
  catch(error){
    console.error('server error with user register: ', error)
    res.status(500).json({ message: 'user register failed' })
  }
})

router.post('/logout', (req, res) => {
  try{
    console.log('logout success')

    res.clearCookie('token')
    res.json('logged out')
  }
  catch(error){
    console.error('logout error: ', error)
    res.status(500).json({ message: 'logout error' })
  }
})

router.get('/:userId', protect, async (req, res) => {
  try{
    const userId = req.params

    console.log('trying to get user')

    if(!userId){
      return res.status(400).json({ message: 'userId missing' })
    }

    const user = await User.findOne({ _id: userId })

    if(!user){
      return res.status(404).json({ message: 'no user exists' })
    }

    console.log('got user')

    res.status(200).json({ success: true, message: 'got user', data: user })
  }
  catch(error){
    console.error('error getting user: ', error)
    res.status(500).json({ message: 'error getting user' })
  }
})

router.delete('/:userId', protect, async (req, res) => {
  try{
    const userId = req.params

    console.log('trying to delete user')

    if(!userId){
      return res.status(400).json({ message: 'userId missing' })
    }

    const deletedUser = await User.findByIdAndDelete(userId)

    if(!deletedUser){
      return res.status(404).json({ message: 'user does not exist' })
    }

    console.log('deleted user')

    res.status(200).json({
      success: true,
      message: 'user deleted'
    })
  }
  catch(error){
    console.error('error deleting user: ', error)
    res.status(500).json({ message: 'error deleting user' })
  }
})

router.put('/:userId', protect, async (req, res) => {
  try{
    const userId = req.params

    console.log('trying to update user')

    if(!userId){
      return res.status(400).json({ message: 'userId missing' })
    }

    const changes = req.body
    changes.updatedAt = Date.now()

    const updatedUser = await User.findByIdAndUpdate(userId,
      { $set: changes },
      { new: true, runValidators: true }
    )

    if(!updatedUser){
      return res.status(404).json({ message: 'user not found' })
    }

    console.log('updated user')

    res.status(200).json({
      success: true,
      message: 'updated user',
      data: updatedUser
    })
  }
  catch(error){
    console.error('error updating user: ', error)
    res.status(500).json({ message: 'error updating user' })
  }
})

module.exports = router
