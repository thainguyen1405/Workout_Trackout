const express = require('express')
const Exercise = require('../models/ExerciseModel.js')
const protect = require('../middleware/authMiddleware.js')

const router = express.Router()

// get all exercises from parameters
// filter using url parameters, /api/exercise?category=cardio&equipment=treadmill
router.get('/', protect, async (req, res) => {
  try{
    console.log('starting to get all exercises')

    const filters = {}

    if (req.query.name) filters.name = req.query.name
    if (req.query.category) filters.category = req.query.category
    if (req.query.equipment) filters.equipment = req.query.equipment
    if (req.query.primaryMuscle) filters.primaryMuscles = req.query.primaryMuscle

    const exercises = await Exercise.find(filters)

    console.log('got all exercises')

    res.status(200).json({
      success: true,
      message: 'got exercises',
      data: exercises
    })   
  }
  catch(error){
    console.error('error getting all exercises: ', error)
    res.status(500).json({ message: 'error getting all exercises' })
  }
})

router.post('/', protect, async (req, res) => {
  try{
    const { name, category, equipment, primaryMuscles } = req.body

    console.log('starting to create exercise')

    if(!name || !category || !primaryMuscles){
      return res.status(400).json({ message: 'name, category, and primaryMuscles are required' })
    }

    const exercise = await Exercise.create({
      name: name,
      category: category,
      equipment: equipment || '',
      primaryMuscles: primaryMuscles
    })

    console.log('created exercise')

    res.status(201).json({ 
      success: true,
      message: 'exercise created',
      data: exercise
    })
  }
  catch(error){
    console.error('error creating exercise: ', error)
    res.status(500).json({ message: 'error creating exercise' })
  }
})

router.get('/:exerciseId', protect, async (req, res) => {
  try{
    const { exerciseId } = req.params

    console.log('starting to get exercise')

    if(!exerciseId){
      return res.status(400).json({ message: 'exerciseId missing' })
    }

    const exercise = await Exercise.findById(exerciseId)

    if(!exercise){
      return res.status(404).json({ message: 'exercise does not exist' })
    }

    console.log('got exercise')
    
    res.status(200).json({
      success: true,
      message: 'got exercise',
      data: exercise
    })
  }
  catch(error){
    console.error('error getting exercise: ', error)
    res.status(500).json({ message: 'error getting exercise' })
  }
})

router.delete('/:exerciseId', protect, async (req, res) => {
  try{
    const { exerciseId } = req.params

    console.log('starting to delete exercise')

    if(!exerciseId){
      return res.status(400).json({ message: 'exerciseId missing' })
    }

    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId)

    if(!deletedExercise){
      return res.status(404).json({ message: 'exercise does not exist' })
    }

    console.log('exercise deleted')

    res.status(200).json({
      success: true,
      message: 'deleted exercise'
    })
  }
  catch(error){
    console.error('error deleting exercise: ', error)
    res.status(500).json({ message: 'error deleting exercise' })
  }
})

router.put('/:exerciseId', protect, async (req, res) => {
  try{
    const { exerciseId } = req.params

    console.log('starting to update exercise')

    if(!exerciseId){
      return res.status(400).json({ message: 'exerciseId missing' })
    }

    const changes = { ...req.body, updatedAt: Date.now() }

    const updatedExercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      { $set: changes },
      { new: true, runValidators: true }
    )

    if(!updatedExercise){
      return res.status(404).json({ message: 'exercise does not exist' })
    }

    console.log('updated exercise')

    res.status(200).json({
      success: true,
      message: 'updated exercise',
      data: updatedExercise
    })
  }
  catch(error){
    console.error('error updating exercise: ', error)
    res.status(500).json({ message: 'error updating exercise' })
  }
})

module.exports = router
