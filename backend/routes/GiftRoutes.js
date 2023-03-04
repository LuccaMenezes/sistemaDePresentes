const router = require('express').Router()

const GiftController = require('../controllers/GiftController')

// middlewares

const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, GiftController.create)

module.exports = router