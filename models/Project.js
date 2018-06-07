const mongoose = require("mongoose")

const helpers = require("../helpers/functions")

const projectSchema = new mongoose.Schema({
  project: {
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

module.exports = mongoose.model("Project", projectSchema)
