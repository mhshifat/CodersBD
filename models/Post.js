const mongoose = require("mongoose")

const helpers = require("../helpers/functions")

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    required: true,
    trim: true
  }],
  image: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    default: "Not Published"
  },
  date: {
    type: String,
    default: helpers.date(new Date())
  },
  dateTime: {
    type: Date,
    default: Date.now()
  },
  username: {
    type: String,
    required: true
  },
  postUpAds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostUpAds"
  }],
  postLoAds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostLoAds"
  }],
  sideUpAds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SideUpAds"
  }],
  sideLoAds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SideLoAds"
  }]
})

module.exports = mongoose.model("Post", postSchema)

