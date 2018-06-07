const mongoose = require("mongoose")

const helpers = require("../helpers/functions")

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  date: {
    type: String,
    default: helpers.date(new Date())
  }
})

module.exports = mongoose.model("Category", catSchema)


