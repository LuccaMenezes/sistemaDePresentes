const router = require('express').Router()

const GiftController = require('../controllers/GiftController')

// middlewares

const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/create', verifyToken, imageUpload.array('images'), GiftController.create)

module.exports = router