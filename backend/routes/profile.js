const express = require('express')
const Profile = require('../models/ProfileModel.js')
const protect = require('../middleware/authMiddleware.js')

const router = express.Router()

// get profile based on user, /api/profile?userId=<userId>
router.get('/', protect, async (req, res) => {
  try{
    const { userId } = req.query

    console.log('starting to get profile')

    if(!userId){
      return res.status(400).json({ message: 'userId missing' })
    }

    const profile = await Profile.findOne({ user: userId })

    if(!profile){
      return res.status(404).json({ message: 'profile does not exist' })
    }

    console.log('got profile')

    res.status(200).json({
      success: true,
      message: 'got profile',
      data: profile
    })
  }
  catch(error){
    console.log('error getting profile: ', error)
    res.status(500).json({ message: 'error getting profile' })
  }
})


router.post('/', protect, async (req, res) => {
  try{
    const { userId, displayName, avatarUrl, bio, homeLat, homeLng, gymName, privacy } = req.body

    console.log('starting to create profile')

    if(!userId || !displayName){
      return res.status(400).json({ message: 'userId and displayName required' })
    }

    const profile = await Profile.create({
      user: userId,
      displayName,
      avatarUrl: avatarUrl || '',
      bio: bio || '',
      homeLat: homeLat || '',
      homeLng: homeLng || '',
      gymName: gymName || '',
      privacy: privacy || ''
    })

    res.status(200).json({
      success: true,
      message: 'profile created',
      data: profile
    })
  } 
  catch(error){
    console.log('error creating profile: ', error)
    res.status(500).json({ message: 'error creating profile' })
  }
})


router.get('/:profileId', protect, async (req, res) => {
  try{
    const { profileId } = req.params

    console.log('starting to get profile by ID')

    if(!profileId){
      return res.status(400).json({ message: 'profileId missing' })
    }

    const profile = await Profile.findById(profileId)

    if(!profile){
      return res.status(404).json({ message: 'profile does not exist' })
    }

    console.log('got profile by ID')

    res.status(200).json({
      success: true,
      message: 'got profile',
      data: profile
    })
  }
  catch(error){
    console.log('error getting profile: ', error)
    res.status(500).json({ message: 'error getting profile' })
  }
})


router.delete('/:profileId', protect, async (req, res) => {
  try{
    const { profileId } = req.params

    console.log('starting to delete profile')

    if(!profileId){
      return res.status(400).json({ message: 'profileId missing' })
    }

    const deletedProfile = await Profile.findByIdAndDelete(profileId)

    if(!deletedProfile){
      return res.status(404).json({ message: 'profile does not exist' })
    }

    console.log('profile deleted')

    res.status(200).json({
      success: true,
      message: 'profile deleted'
    })
  }
  catch(error){
    console.log('error deleting profile: ', error)
    res.status(500).json({ message: 'error deleting profile' })
  }
})


router.put('/:profileId', protect, async (req, res) => {
  try{
    const { profileId } = req.params

    console.log('starting to update profile')

    if(!profileId){
      return res.status(400).json({ message: 'profileId missing' })
    }

    const changes = { ...req.body, updatedAt: Date.now() }

    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      { $set: changes },
      { new: true, runValidators: true }
    )

    if(!updatedProfile){
      return res.status(404).json({ message: 'profile does not exist' })
    }

    console.log('profile updated')

    res.status(200).json({
      success: true,
      message: 'profile updated',
      data: updatedProfile
    })
  } 
  catch(error){
    console.log('error updating profile: ', error)
    res.status(500).json({ message: 'error updating profile' })
  }
})

module.exports = router
