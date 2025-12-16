const express = require('express')
const protect = require('../middleware/authMiddleware.js')
const Activity = require('../models/ActivityModel.js')

const router = express.Router()

router.post('/', protect, async (req, res) => {
  try{
    const { userId, type, startedAt, endedAt, distance, movingTime, avgPace, isLive } = req.body

    console.log('starting to create activity')

    if(!userId || !type || ! startedAt || !isLive){
      return res.status(400).json({ message: 'userId, type, startedAt, and isLive are required' })
    }

    const activity = await Activity.create({
      userId,
      type,
      startedAt, 
      endedAt, 
      distance: distance || '',
      movingTime: movingTime || '',
      avgPace: avgPace || '',
      isLive
    })

    console.log('activity created')

    res.status(201).json({ 
      success: true,
      message: 'activity created',
      data: activity
    })
  }
  catch(error){
    res.status(500).json({ message: 'error creating activity' })
  }
})

router.get('/:activityId', protect, async (req, res) => {
  try{
    const { activityId } = req.params

    console.log('starting to get activity')

    const activity = await Activity.findById(activityId)

    if(!activity){
      return res.status(401).json({ message: 'activity does not exist' })
    }

    console.log('got activity')

    res.status(200).json({
      success: true,
      message: 'got activity',
      data: activity
    })
  }
  catch(error){
    res.status(500).json({ message: 'error getting activity' })
  }
})

router.get('/', protect, async (req, res) => {
  try{
    const { userId } = req.query

    console.log('starting to get activities')

    const activities = await Activity.find({ user: userId })

    console.log('got activities')

    res.status(200).json({
      success: true,
      message: 'got activities',
      data: activities
    })
  }
  catch(error){
    res.status(500).json({ message: 'error getting activity' })
  }
})

router.put('/:activityId', protect, async (req, res) => {
  try{
    const { activityId } = req.params

    if(!activityId){
      return res.status(400).json({ message: 'activityId is missing' })
    }

    console.log('starting to update activity')

    const changes = { ...req.body, updatedAt: Date.now() }

    const updatedActivity = await Activity.findByIdAndUpdate(
      partnerId,
      { $set: changes },
      { new: true, runValidators: true }
    )

    if(!updatedActivity){
      return res.status(401).json({ message: 'activity does not exist' })
    }

    console.log('updated activity')

    res.status(200).json({ 
      success: true,
      message: 'updated activity',
      data: updatedActivity
    })
  }
  catch(error){
    res.status(500).json({ message: 'error updating activity' })
  }
})

router.delete('/:activityId', protect, async (req, res) => {
  try{
    const { activityId } = req.params

    if(!activityId){
      return res.status(400).json({ message: 'missing activityId' })
    }
    
    console.log('staring to delete activity')

    const deletedActivity = await Activity.findByIdAndDelete(activityId)

    if(!deletedActivity){
      return res.status(401).json({ message: 'activity does not exist' })
    }

    console.log('activity deleted')

    res.status(200).json({
      success: true,
      message: 'activity deleted',
      data: deletedActivity
    })
  }
  catch(error){
    res.status(500).json({ message: 'error deleting activity' })
  }
})

module.exports = router
