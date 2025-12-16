const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        console.log('health check requested')

        res.status(200).json({
            success: true,
            message: 'server is healthy',
            data: {
                uptime: process.uptime(),
                timestamp: new Date().toISOString(),
                status: 'OK'
            }
        })
    }
    catch (error) {
        console.error('health check error:', error)
        res.status(500).json({
            success: false,
            message: 'error performing health check'
        })
    }
})

module.exports = router
