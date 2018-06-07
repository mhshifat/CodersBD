const mongoose = require("mongoose")

const helpers = require("../helpers/functions")

const postUpAdsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: helpers.date(new Date())
  }
})

module.exports = mongoose.model("PostUpAds", postUpAdsSchema)



