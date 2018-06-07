const express = require("express")
const path = require("path")
const fs = require("fs")
const router = express.Router()

const Category = require("../models/Category")
const User = require("../models/User")
const UpperPostAds = require("../models/PostUpAds")
const LowerPostAds = require("../models/PostLoAds")
const SideUpAds = require("../models/SideUpAds")
const SideLoAds = require("../models/SideLoAds")

router.post('/upperAds', (req, res) => {
  if (!req.body.upperAds) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/add-advertises")
  } else {
    User.findOne({username: req.cookies.CodersBD}).populate('postUpAds').exec((err, postUpAds) => {
      const adsId = postUpAds.postUpAds[0]._id
      UpperPostAds.findByIdAndUpdate(adsId, {content: req.body.upperAds}, (err, ad)=> {
        if (err) {
          console.log(err)
        } else {
          User.findOne({
            username: req.cookies.CodersBD
          }, (err, user) => {
            if (err) {
              console.log(err)
            } else {
              user.postUpAds.push(ad)
              user.save(err => {
                req.flash("success", "Your ad has been placed")
                res.redirect("/dashboard/add-advertises")
              })
            }
          })
        }
      })
    })
  }
})

router.post('/lowerAds', (req, res) => {
  if(!req.body.lowerAds) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/add-advertises")
  } else {
    User.findOne({username: req.cookies.CodersBD}).populate('postLoAds').exec((err, postLoAds) => {
      const adsId = postLoAds.postLoAds[0]._id
      LowerPostAds.findByIdAndUpdate(adsId, {content: req.body.lowerAds}, (err, ad)=> {
        if (err) {
          console.log(err)
        } else {
          User.findOne({
            username: req.cookies.CodersBD
          }, (err, user) => {
            if (err) {
              console.log(err)
            } else {
              user.postLoAds.push(ad)
              user.save(err => {
                req.flash("success", "Your ad has been placed")
                res.redirect("/dashboard/add-advertises")
              })
            }
          })
        }
      })
    })
  }
})

router.post('/sideUpAds', (req, res) => {
  if(!req.body.sidebarUpperAds) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/add-advertises")
  } else {
    User.findOne({username: req.cookies.CodersBD}).populate('sideUpAds').exec((err, sideUpAds) => {
      const adsId = sideUpAds.sideUpAds[0]._id
      SideUpAds.findByIdAndUpdate(adsId, {content: req.body.sidebarUpperAds}, (err, ad)=> {
        if (err) {
          console.log(err)
        } else {
          User.findOne({
            username: req.cookies.CodersBD
          }, (err, user) => {
            if (err) {
              console.log(err)
            } else {
              user.sideUpAds.push(ad)
              user.save(err => {
                req.flash("success", "Your ad has been placed")
                res.redirect("/dashboard/add-advertises")
              })
            }
          })
        }
      })
    })
  }
})

router.post('/sideLoAds', (req, res) => {
  if(!req.body.lowerUpperAds) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/add-advertises")
  } else {
    User.findOne({username: req.cookies.CodersBD}).populate('sideLoAds').exec((err, sideLoAds) => {
      const adsId = sideLoAds.sideLoAds[0]._id
      SideLoAds.findByIdAndUpdate(adsId, {content: req.body.lowerUpperAds}, (err, ad)=> {
        if (err) {
          console.log(err)
        } else {
          User.findOne({
            username: req.cookies.CodersBD
          }, (err, user) => {
            if (err) {
              console.log(err)
            } else {
              user.sideLoAds.push(ad)
              user.save(err => {
                req.flash("success", "Your ad has been placed")
                res.redirect("/dashboard/add-advertises")
              })
            }
          })
        }
      })
    })
  }
})

module.exports = router
