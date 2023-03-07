const Gift = require('../models/Gift')

// helpers

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class GiftController {
   // create a gift
   static async create(req, res) {
      const { name, description, category } = req.body

      const images = req.files

      const available = true

      // images upload

      // validations
      if(!name) {
         res.status(422).json({message: "O nome é obrigatório!"})
         return
      }

      if(!description) {
         res.status(422).json({message: "A descrição é obrigatória!"})
         return
      }

      if(!category) {
         res.status(422).json({message: "A categoria é obrigatória!"})
         return
      }
      console.log (images);
      if (!req.files || Object.keys(req.files).length === 0) {
         res.status(422).json({ message: "A imagem é obrigatória!" })
         return
       }
       
      // get gift owner
      const token = getToken(req)
      const user = await getUserByToken(token)

      const gift = new Gift({
         name,
         description,
         category,
         available,
         images: [],
         user: {
            _id: user.id,
            name: user.name,
         }
      })

      images.map((image) => {
         gift.images.push(image.filename)
      })

      try {
         const newGift = await gift.save()
         res.status(201).json({
            message: 'Presente cadastrado com sucesso!',
            newGift,
         })
      } catch (error) {
         res.status(500).json({message: error})
      }
   }

   // get all registered gifts
   static async getAll(req, res) {
      const gifts = await Gift.find().sort('-createdAt')

      res.status(200).json({
         gifts: gifts,
      })
   }

   /// get all user gifts
   static async getAllUserGifts(req, res) {
      // get user
      const token = getToken(req)
      const user = await getUserByToken(token)
      const userId = user._id.toString();

      const gifts = await Gift.find({ 'user._id': userId })

      res.status(200).json({
         gifts,
      })
   }

   static async getGiftById(req, res) {
      const id = req.params.id

      if (!ObjectId.isValid(id)) {
         res.status(422).json({ message: 'ID inválido!' })
         return
      }

      // check if gift exists
      const gift = await Gift.findOne({ _id: id })

      if (!gift) {
         res.status(404).json({ message: 'Presente não encontrado!' })
         return
      }

      res.status(200).json({
         gift: gift,
      })
   }

   // remove a gift
   static async removeGiftById(req, res) {
      const id = req.params.id

      // check if id is valid
      if (!ObjectId.isValid(id)) {
         res.status(422).json({ message: 'ID inválido!' })
         return
      }

      // check if gift exists
      const gift = await Gift.findOne({ _id: id })

      if (!gift) {
         res.status(404).json({ message: 'Presente não encontrado!' })
         return
      }

      // check if user registered this gift
      const token = getToken(req)
      const user = await getUserByToken(token)

      if (gift.user._id.toString() != user._id.toString()) {
         res.status(404).json({
            message:
               'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
         })
         return
      }

      await Gift.findByIdAndRemove(id)

      res.status(200).json({ message: 'Presente removido com sucesso!' })
   }

   static async updateGift(req, res) {
      const id = req.params.id

      const { name, description, category, available } = req.body

      const images = req.files

      const updateData = {}

    // check if gift exists
    const gift = await Gift.findOne({ _id: id })

    if (!gift) {
      res.status(404).json({ message: 'Presente não encontrado!' })
      return
    }

    // check if user registered this gift
    const token = getToken(req)
    const user = await getUserByToken(token)

    if (gift.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    // validations
    if(!name) {
      res.status(422).json({message: "O nome é obrigatório!"})
      return
   } else {
      updateData.name = name
   }

   if(!description) {
      res.status(422).json({message: "A descrição é obrigatória!"})
      return
   } else {
      updateData.description = description
   }

   if(!category) {
      res.status(422).json({message: "A categoria é obrigatória!"})
      return
   } else {
      updateData.category = category
   }
   console.log (images);
   if (!req.files || Object.keys(req.files).length === 0) {
      res.status(422).json({ message: "A imagem é obrigatória!" })
      return
   } else {
      updateData.images = []
      images.map((image) => {
         updateData.images.push(image.filename)
      })
   }

   await Gift.findByIdAndUpdate(id, updateData)

   res.status(200).json({ message: 'Presente atualizado com sucesso!'})
   }
}