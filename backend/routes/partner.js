const express = require('express')
const Partner = require('../models/PartnerModel.js')
const protect = require('../middleware/authMiddleware.js')

const router = express.Router()

// when the route asks for partnerId, it means the object id not the id of the other user

// get all partners for a user, .../partner?userId=<userId>
router.get('/', protect, async (req, res) => {
  try{
    const { userId } = req.query

    console.log('starting to get partners')

    if(!userId){
      return res.status(400).json({ message: 'userId missing' })
    }

    const partners = await Partner.find({ user: userId })

    console.log('got partners')

    res.status(200).json({ 
      success: true,
      message: 'got partners',
      data: partners
    })
  }
  catch(error){
    console.log('error getting partners: ', error)
    res.status(500).json({ message: 'error getting partners' })
  }
})

// get a partner by id
router.get('/:partnerId', protect, async (req, res) => {
  try{
    const { partnerId } = req.params
    
    console.log('starting to get partner')

    if(!partnerId){
      return res.status(400).json({ message: 'partnerId missing' })
    }

    const partner = await Partner.findById(partnerId)

    if(!partner){
      return res.status(404).json({ message: 'partner does not exist' })
    }

    console.log('got partner')

    res.status(200).json({
      success: true,
      message: 'got partner',
      data: partner
    })
  }
  catch(error){
    console.log('error getting partners: ', error)
    res.status(500).json({ message: 'error getting partner' })
  }
})

router.post('/', protect, async (req, res) => {
  try{
    const { userId, otherUserId, status } = req.body

    console.log('starting to create partner')

    if(!userId || !otherUserId || !status){
      return res.status(400).json({ message: 'all fields are required' })
    }

    const partner = await Partner.create({
      user: userId,
      partner: otherUserId,
      status: status || 'pending'
    })

    console.log('partner created')

    res.status(201).json({
      success: true,
      message: 'partner created',
      data: partner
    })
  }
  catch(error){
    console.log('error getting partners: ', error)
    res.status(500).json({ message: 'error creating partner' })
  }
})

router.delete('/:partnerId', protect, async (req, res) => {
  try{
    const { partnerId } = req.params 

    console.log('starting to delete partner')
  
    if(!partnerId){
      return res.status(400).json({ message: 'partnerId missing' })
    }

    const deletedPartner = await Partner.findByIdAndDelete(partnerId)

    if(!deletedPartner){
      return res.status(404).json({ message: 'partner does not exist' })
    }

    console.log('partner deleted')

    res.status(200).json({
      success: true,
      message: 'partner deleted',
    })
  }
  catch(error){
    console.log('error getting partners: ', error)
    res.status(500).json({ message: 'error deleting partner' })
  }
})

router.put('/:partnerId', protect, async (req, res) => {
  try{
    const { partnerId } = req.params 

    console.log('starting to update partner')

    if(!partnerId){
      return res.status(400).json({ message: 'partnerId missing' })
    }

    const changes = { ...req.body, updatedAt: Date.now() }

    const updatedPartner = await Partner.findByIdAndUpdate(
      partnerId,
      { $set: changes },
      { new: true, runValidators: true }
    )

    if(!updatedPartner){
      return res.status(404).json({ message: 'partner does not exist' })
    }

    console.log('partner updated')

    res.status(200).json({
      success: true,
      message: 'partner updated',
      data: updatedPartner
    })
  }
  catch(error){
    console.log('error getting partners: ', error)
    res.status(500).json({ message: 'error updating partner' })
  }
})

module.exports = router
