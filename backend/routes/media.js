const express = require('express')
const Media = require('../models/MediaModel.js')
const protect = require('../middleware/authMiddleware.js')

const router = express.Router()

router.post('/', protect, async (req, res) => {
  try{
    const { userId, url, type } = req.body 

    if(!userId || !url || !type){
      return res.status(400).json({ message: 'all fields are required' })
    }

    console.log('starting to create media')

    const media = await Media.create({
      userId, 
      url,
      type
    })

    console.log('media created')

    res.status(201).json({ 
      success: true,
      message: 'media created',
      data: media
    })
  }
  catch(error){
    res.status(500).json({ message: 'error creating media' })
  }
})

router.get('/', protect, async (req, res) => {
  try{
    const { userId } = req.query 

    if(!userId){
      return res.status(400).json({ message: 'userId is missing' })
    }

    console.log('starting to get media')

    const media = await Media.find({
      userId: userId 
    })

    console.log('got media')

    res.status(200).json({ 
      success: true,
      message: 'got media',
      data: media
    })
  }
  catch(error){
    res.status(500).json({ message: 'error getting media' })
  }
})

router.get('/:mediaId', protect, async (req, res) => {
  try{
    const { mediaId } = req.params 

    if(!mediaId){
      return res.status(400).json({ message: 'mediaId missing' })
    }

    console.log('starting to get media')

    const media = await Media.findById(mediaId)

    if(!media){
      return res.status(401).json({ message: 'media does not exist' })
    }

    console.log('got media')

    res.status(200).json({ 
      success: true,
      message: 'got media',
      data: media
    })
  }
  catch(error){
    res.status(500).json({ message: 'error getting media' })
  }
})

router.put('/:mediaId', protect, async (req, res) => {
  try{
    const { mediaId } = req.params 

    if(!mediaId){
      return res.status(400).json({ message: 'mediaId missing' })
    }

    console.log('starting to update media')

    const changes = { ...req.body, updatedAt: Date.now() }

    const updatedMedia = await Media.findByIdAndUpdate(
      mediaId,
      { $set: changes },
      { new: true, runValidators: true }
    )

    if(!updatedMedia){
      return res.status(401).json({ message: 'media does not exist' })
    }

    console.log('media updated')

    res.status(200).json({ 
      success: true,
      message: 'media updated',
      data: updatedMedia
    })
  }
  catch(error){
    res.status(500).json({ message: 'error updating media' })
  }
})

router.delete('/:mediaId', protect, async (req, res) => {
  try{
    const { mediaId } = req.params 

    if(!mediaId){
      return res.status(400).json({ message: 'mediaId missing' })
    }

    console.log('starting to delete media')

    const deletedMedia = await Media.findByIdAndDelete(mediaId)

    if(!deletedMedia){
      return res.status(401).json({ message: 'media does not exist' })
    }

    console.log('media deleted')

    res.status(200).json({ 
      success: true,
      message: 'media deleted',
      data: deletedMedia
    })
  }
  catch(error){
    res.status(500).json({ message: 'error deleting media' })
  }
})

module.exports = router
