const router = require('express').Router()

const GiftController = require('../controllers/GiftController')

// middlewares

const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/create', verifyToken, imageUpload.array('images'), GiftController.create)
router.get('/', GiftController.getAll)
router.get('/mygifts', verifyToken, GiftController.getAllUserGifts)
router.get('/:id', GiftController.getGiftById)
router.delete('/:id', verifyToken, GiftController.removeGiftById)
router.patch('/:id', verifyToken, imageUpload.array('images'), GiftController.updateGift)

module.exports = router