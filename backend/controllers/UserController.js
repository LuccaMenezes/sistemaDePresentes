const User = require('../models/User')

module.exports = class UserController {
   static async register(req, res) {
      const { name, email, phone, password, confirmpassword } = req.body

      //validations
      if (!name) {
         res.status(422).json({ message: 'O nome é obrigatório!' })
         return
      }

      if (!email) {
         res.status(422).json({ message: 'O e-mail é obrigatório!' })
         return
      }

      if (!phone) {
         res.status(422).json({ message: 'O telefone é obrigatório!' })
         return
      }

      if (!password) {
         res.status(422).json({ message: 'A senha é obrigatória!' })
         return
      }

      if (!confirmpassword) {
         res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
         return
      }

      if (password != confirmpassword) {
         res
            .status(422)
            .json({ message: 'A senha e a confirmação precisam ser iguais!' })
         return
      }

      // check if user exists
      const userExists = await User.findOne({ email: email })

      if (userExists) {
         res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
         return
      }
   }
}