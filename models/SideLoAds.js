const mongoose = require("mongoose")

const helpers = require("../helpers/functions")

const sideLoAdsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: helpers.date(new Date())
  }
})

module.exports = mongoose.model("SideLoAds", sideLoAdsSchema)



