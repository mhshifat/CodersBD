const mongoose = require("mongoose")
const color = require("colors")

const config = require("../config/config")

module.exports = mongoose.connect(config.db, () => {
  console.log(color.yellow("A Database Connection Has Been Established >>> CodersBD"))
})
