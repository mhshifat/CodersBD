
const mongoose = require("mongoose")

const helpers = require("../helpers/functions")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    default: "User"
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  ],
  postUpAds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostUpAds"
    }
  ],
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
  }],
  date: {
    type: String,
    default: helpers.date(new Date())
  }
});

module.exports = mongoose.model("User", userSchema)
