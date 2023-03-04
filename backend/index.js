const express = require('express')
const cors = require('cors')

const UserRoutes = require('./routes/UserRoutes')
const GiftRoutes = require('./routes/GiftRoutes')

const app = express()

// Config JSON response
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

// Routes

app.use('/users', UserRoutes)
app.use('/gifts', GiftRoutes)

app.listen(5000)