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
  }
})

module.exports = mongoose.model("Post", postSchema)

