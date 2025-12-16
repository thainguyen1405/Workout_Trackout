const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
// const admin = require ('firebase-admin')
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

const userRoutes = require('./routes/user.js')
const profileRoutes = require('./routes/profile.js')
const preferenceRoutes = require('./routes/preference.js')
const exerciseRoutes = require('./routes/exercise.js')
const partnerRoutes = require('./routes/partner.js')
const activityRoutes = require('./routes/activity.js')
const healthRoutes = require('./routes/health.js')
const mediaRoutes = require('./routes/media.js')
const templateRoutes = require('./routes/template.js')

app.use('/api/user', userRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/preference', preferenceRoutes)
app.use('/api/exercise', exerciseRoutes)
app.use('/api/partner', partnerRoutes)
app.use('/api/activity', activityRoutes)
app.use('/api/health', healthRoutes)
app.use('/api/media', mediaRoutes)
app.use('/api/template', templateRoutes)

const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/xrcise'
const port = process.env.PORT || 5000

// use mongo db for the time being
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('connected to db');
  app.listen(port, () => console.log('server started on port: ', port))
})
.catch(error => console.error('connection error: ', error))
