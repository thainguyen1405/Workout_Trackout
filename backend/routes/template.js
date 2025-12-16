const express = require('express')
const protect = require('../middleware/authMiddleware.js')
const WorkoutTemplate = require('../models/WorkoutTemplate.js')
const TemplateExercise = require('../models/TemplateExercise.js')

const router = express.Router()

// GET all templates for a user
router.get('/', protect, async (req, res) => {
    try {
        const { userId } = req.query

        if (!userId){
            return res.status(400).json({ message: 'userId missing' })
        }

        const templates = await WorkoutTemplate.find({ user: userId })

        res.status(200).json({
            success: true,
            message: 'got templates',
            data: templates
        })
    }
    catch (error) {
        res.status(500).json({ message: 'error getting templates' })
    }
})

// GET single template by id
router.get('/:templateId', protect, async (req, res) => {
    try {
        const { templateId } = req.params

        const template = await WorkoutTemplate.findById(templateId)

        if(!template){
            return res.status(404).json({ message: 'template does not exist' })
        }

        const exercises = await TemplateExercise.find({ template: templateId })

        res.status(200).json({
            success: true,
            message: 'got template',
            data: { template, exercises }
        })
    }
    catch (error) {
        res.status(500).json({ message: 'error getting template' })
    }
})

// CREATE template 
router.post('/', protect, async (req, res) => {
    try {
        const { userId, title, description, visibility } = req.body

        if(!userId || !title){
            return res.status(400).json({ message: 'userId and title are required' })
        }

        const template = await WorkoutTemplate.create({
            user: userId,
            title,
            description: description || '',
            visibility: visibility || 'private'
        })

        res.status(201).json({
            success: true,
            message: 'template created',
            data: template
        })
    }
    catch (error) {
        res.status(500).json({ message: 'error creating template'})
    }
})

// UPDATE template
router.put('/:templateId', protect, async (req, res) => {
    try {
        const { templateId } = req.params

        const changes = { ...req.body, updateAt: Date.now() }

        const updated = await WorkoutTemplate.findByIdAndUpdate(
            templateId,
            { $set: changes },
            { new: true, runValidators: true }
        )

        if(!updated){
            return res.status(404).json({ message: 'template does not exist' })
        }

        res.status(200).json({
            success: true,
            message: 'template updated',
            data: updated
        })
    }
    catch (error) {
        res.status(500).json({ message: 'error updating template '})
    }
})

// DELETE template 
router.delete('/:templateId', protect, async (req, res) => {
    try {
        const { templateId } = req.params

        const deleted = await WorkoutTemplate.findByIdAndDelete(templateId)

        if(!deleted){
            return res.status(404).json({ message: 'template does not exist' })
        }

        await TemplateExercise.deleteMany({ template: templateId })

        res.status(200).json({
            success: true,
            message: 'template deleted'
        })
    }
    catch (error) {
        res.status(500).json({ message: 'error deleting template '})
    }
})

///////// Template exercise subroutes ////////////

// ADD exercise to a template 
router.post('/:templateId/exercise', protect, async (req, res) => {
    try {
        const { templateId } = req.params
        const { exerciseId, orderIndex, defaultSets, defaultReps, defaultWeight } = req.body

        if(!exerciseId || orderIndex == undefined) {
            return res.status(400).json({ message: 'exerciseId and orderIndex are required' })
        }

        const entry = await TemplateExercise.create({
            template: templateId,
            exercise: exerciseId,
            orderIndex,
            defaultSets: defaultSets || 3,
            defaultReps: defaultReps || 10,
            defaultWeight: defaultWeight || 0
        })

        res.status(201).json({
            success: true,
            message: 'exercise added to template',
            data: entry
        })
    }
    catch (error) {
        res.status(500).json({ message: 'error adding exercise to template '})
    }
})

// UPDATE a template exercie entry
router.put('/exercise/:entryId', protect, async (req, res) =>{
    try {
        const { entryId } = req.params
        const changes = req.body

        const updated = await TemplateExercise.findByIdAndUpdate(
            entryId,
            { $set: changes },
            { new: true, runValidators: true }
        )

        if(!updated){
            return res.status(404).json({ message: 'template exercise not found' })
        }

        res.status(200).json({
            success: true,
            message: 'template exercise updated',
            data: updated
        })
    }
    catch (error) {
        res.status(500).json({ message: 'error updating template exercise' })
    }
})

// DELETE exercise from template
router.delete('/exercise/:entryId', protect, async (req, res) => {
    try {
        const { entryId } = req.params

        const deleted = await TemplateExercise.findByIdAndDelete(entryId)

        if(!deleted) {
            return res.status(404).json({ message: 'template exercise not found' })
        }

        res.status(200).json({
            success: true,
            message: 'exercise removed from template'
        })
    }
    catch (error) {
        res.status(500).json({ message: 'error removing exercise from template' })
    }
})

module.exports = router
