const bcrypt = require("bcryptjs")
const color = require("colors")

const User = require("../models/User")

const config = require('../config/config')

const randomNumber = Math.floor(Math.random() * 10000000)
const token = `C${randomNumber}O${randomNumber}D${randomNumber}E${randomNumber}R${randomNumber}S${randomNumber}B${randomNumber}D`

module.exports = User.findOne({email: config.adminEmail}).exec((err, user) => {
  if(user) {
    console.log(color.blue(`Admin User Already exist >>> ${user.username}`))
  } else {
    bcrypt.hash(config.adminPass, 10, (err, hashPwd) => {
      const admin = {
        username: "Mehedi Hassan",
        email: config.adminEmail,
        password: hashPwd,
        isAdmin: true,
        isActivated: true,
        token: token,
        position: "Admin"
      }
      User.create(admin, (err, admin) => {
        if (err) {
          console.log(err)
        } else {
          console.log(color.magenta("Admin Account Has Been Created >>> Mehedi Hassan"))
        }
      })
    })
  }
})
