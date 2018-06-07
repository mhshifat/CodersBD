const User = require("../models/User")

module.exports = {
  admin: (req, res, next) => {
    if(req.cookies.CodersBD) {
      User.findOne({username: req.cookies.CodersBD}).exec((err, user) => {
        if(err) {
          console.log(err)
        } else {
          if(user.isAdmin) {
            next()
          } else {
            req.flash('error', "You don't have permission to visit this page")
            res.redirect('/')
          }
        }
      })
    } else {
      req.flash('error', "You don't have permission to visit this page")
      res.redirect('/')
    }
  },
  user: (req, res, next) => {
    if(req.cookies.CodersBD) {
      User.findOne({username: req.cookies.CodersBD}).exec((err, user) => {
        if(err) {
          console.log(err)
        } else {
          if(user) {
            next()
          }
        }
      })
    } else {
      req.flash('error', "You don't have permission to visit this page")
      res.redirect('/')
    }
  },
  guest: (req, res, next) => {
    if(!req.cookies.CodersBD) {
      next()
    } else {
      req.flash('error', "You don't have permission to visit this page")
      res.redirect('/')
    }
  }
}
