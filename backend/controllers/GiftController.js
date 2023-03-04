const Gift = require('../models/Gift')

// helpers

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class GiftController {
   // create a gift
   static async create(req, res) {
      const { name, description, category, images } = req.body

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
}