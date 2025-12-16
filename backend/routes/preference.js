const express = require('express')
const Preference = require('../models/PreferenceModel.js')
const protect = require('../middleware/authMiddleware.js')

const router = express.Router()

// based on user id, /api/preference?userId=<userId>
router.get('/', protect, async (req, res) => {
  try{
    const { userId } = req.query

    console.log('starting to get preference')

    if(!userId){
      return res.status(400).json({ message: 'userId missing' })
    }

    const preference = await Preference.findOne({ user: userId })

    if(!preference){
      return res.status(400).json({ message: 'preference does not exist' })
    }

    console.log('got preference')

    res.status(200).json({
      success: true,
      message: 'got preference',
      data: preference
    })
  }
  catch(error){
    console.error('error getting preference: ', error)
    res.status(500).json({ message: 'error getting preference' })
  }
})

// get preference based on preference id
router.get('/:preferenceId', protect, async (req, res) => {
  try{
    const { preferenceId } = req.params

    console.log('starting to get preference')

    if(!preferenceId){
      return res.status(400).json({ message: 'preferenceId missing' })
    }

    const preference = await Preference.findById(preferenceId)

    if(!preference){
      return res.status(400).json({ message: 'preference does not exist' })
    }

    console.log('got preference')

    res.status(200).json({
      success: true,
      message: 'got preference',
      data: preference
    })
  }
  catch(error){
    console.error('error getting preference: ', error)
    res.status(500).json({ message: 'error getting preference' })
  }

})

router.post('/', protect, async (req, res) => {
  try{
    const { userId, types, goals, preferredTimes } = req.body

    console.log('starting to create preference')

    if(!userId){
      return res.status(400).json({ message: 'userId missing' })
    }

    const preference = await Preference.create({
      user: userId,
      types: types || [],
      goals: goals || [],
      preferredTimes: preferredTimes || []
    })

    console.log('created preference')

    res.status(201).json({
      success: true,
      message: 'created preference',
      data: preference
    })
  }
  catch(error){
    console.error('error getting preference: ', error)
    res.status(500).json({ message: 'error getting preference' })
  }

})

router.put('/:preferenceId', protect, async (req, res) => {
  try{
    const { preferenceId } = req.params

    console.log('starting to update preference')

    if(!preferenceId){
      return res.status(400).json({ message: 'preferenceId missing' })
    }

    const changes = { ...req.body, updatedAt: Date.now() }

    const updatedPreference = await Preference.findByIdAndUpdate(
      preferenceId,
      { $set: changes },
      { new: true, runValidators: true }
    )

    if(!updatedPreference){
      return res.status(400).json({ message: 'preference does not exist' })
    }

    console.log('updated preference')

    res.status(200).json({
      success: true,
      message: 'updated preference',
      data: updatedPreference
    })
  }
  catch(error){
    console.error('error updating preference: ', error)
    res.status(500).json({ message: 'error updating preference' })
  }

})

router.delete('/:preferenceId', protect, async (req, res) => {
  try{
    const { preferenceId } = req.params

    console.log('starting to delete preference')

    if(!preferenceId){
      return res.status(400).json({ message: 'preferenceId missing' })
    }

    const deletedPreference = await Preference.findByIdAndDelete(preferenceId)

    if(!deletedPreference){
      return res.status(400).json({ message: 'preference does not exist' })
    }

    console.log('preferece deleted')

    res.status(200).json({
      success: true,
      message: 'preferece deleted'
    })
  }
  catch(error){
    console.error('error deleting preference: ', error)
    res.status(500).json({ message: 'error deleting preference' })
  }
})

module.exports = router
