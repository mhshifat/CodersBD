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
      if(postUpAds.postUpAds.length > 0) {
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
      } else {
        UpperPostAds.create({content: req.body.upperAds}, (err, upperAds) => {
          if(err) {
            console.log(err)
          } else {
            User.findOne({username: req.cookies.CodersBD}, (err, user) => {
              if(err) {
                console.log(err)
              } else {
                user.postUpAds.push(upperAds)
                user.save(err => {
                  req.flash("success", "Your ad has been placed")
                  res.redirect("/dashboard/add-advertises")
                })
              }
            })
          }
        })
      }
    })
  }
})

router.post('/lowerAds', (req, res) => {
  if(!req.body.lowerAds) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/add-advertises")
  } else {
    User.findOne({username: req.cookies.CodersBD}).populate('postLoAds').exec((err, postLoAds) => {
      if(postLoAds.postLoAds.length > 0) {
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
      } else {
        LowerPostAds.create({content: req.body.lowerAds}, (err, lowerAds) => {
          if(err) {
            console.log(err)
          } else {
            User.findOne({username: req.cookies.CodersBD}, (err, user) => {
              if(err) {
                console.log(err)
              } else {
                user.postLoAds.push(lowerAds)
                user.save(err => {
                  req.flash("success", "Your ad has been placed")
                  res.redirect("/dashboard/add-advertises")
                })
              }
            })
          }
        })
      }
    })
  }
})

router.post('/sideUpAds', (req, res) => {
  if(!req.body.sidebarUpperAds) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/add-advertises")
  } else {
    User.findOne({username: req.cookies.CodersBD}).populate('sideUpAds').exec((err, sideUpAds) => {
      if(sideUpAds.sideUpAds.length > 0) {
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
      } else {
        SideUpAds.create({content: req.body.sidebarUpperAds}, (err, sideUpAds) => {
          if(err) {
            console.log(err)
          } else {
            User.findOne({username: req.cookies.CodersBD}, (err, user) => {
              if(err) {
                console.log(err)
              } else {
                user.sideUpAds.push(sideUpAds)
                user.save(err => {
                  req.flash("success", "Your ad has been placed")
                  res.redirect("/dashboard/add-advertises")
                })
              }
            })
          }
        })
      }
    })
  }
})

router.post('/sideLoAds', (req, res) => {
  if(!req.body.lowerUpperAds) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/add-advertises")
  } else {
    User.findOne({username: req.cookies.CodersBD}).populate('sideLoAds').exec((err, sideLoAds) => {
      if(sideLoAds.sideLoAds.length > 0) {
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
      } else {
        SideLoAds.create({content: req.body.lowerUpperAds}, (err, sideLoAds) => {
          if(err) {
            console.log(err)
          } else {
            User.findOne({username: req.cookies.CodersBD}, (err, user) => {
              if(err) {
                console.log(err)
              } else {
                user.sideLoAds.push(sideLoAds)
                user.save(err => {
                  req.flash("success", "Your ad has been placed")
                  res.redirect("/dashboard/add-advertises")
                })
              }
            })
          }
        })
      }
    })
  }
})

module.exports = router
