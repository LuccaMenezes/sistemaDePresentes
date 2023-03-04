const mongoose = require('../db/conn')
const { Schema } = mongoose

const Gift = mongoose.model(
  'Gift',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    available: {
      type: Boolean,
    },
    guest: Object,
  }, {timestamps: true}),
)

module.exports = Gift