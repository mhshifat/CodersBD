const express = require("express")
const path = require("path")
const fs = require("fs")
const router = express.Router()

const Category = require("../models/Category")
const User = require("../models/User")

router.post('/category', (req, res) => {
  if(!req.body.category) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/add-category")
  } else {
    Category.findOne({name: req.body.category}).exec((err, category) => {
      if(err) {
        console.log(err)
      } else {
        if(category) {
           req.flash("error", "Category name already exist")
           res.redirect("/dashboard/add-category")
        } else {
          Category.create({name: req.body.category}, (err, saved) => {
            if(err) {
              console.log(err)
            } else {
              User.findOne({username: req.cookies.CodersBD}, (err, user) => {
                if(err) {
                  console.log(err)
                } else {
                  user.categories.push(saved)
                  user.save((err) => {
                    if(err) {
                      console.log(err)
                    } else {
                      req.flash("success", "Your category has been added")
                      res.redirect("/dashboard/add-category")
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  }
})

router.post('/dashboard/upPost/:id', (req, res) => {
  if(!req.body.category) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/add-category")
  } else {
    Category.findOne({name: req.body.category}).exec((err, category) => {
      if(err) {
        console.log(err)
      } else {
        if(category) {
           req.flash("error", "Category name already exist")
           res.redirect("/dashboard/add-category")
        } else {
          Category.findByIdAndUpdate(req.params.id, {name: req.body.category}, (err, saved) => {
            if(err) {
              console.log(err)
            } else {
              req.flash("success", "Your category has been added")
              res.redirect("/dashboard/add-category")
            }
          })
        }
      }
    })
  }
})

router.post("/dashboard/cat/:id/delete", (req, res) => {
  Category.findByIdAndRemove(req.params.id, (err, done) => {
    if(err) {
      console.log(err)
    } else {
      req.flash("success", "Your category has been deleted")
      res.redirect("/dashboard/add-category")
    }
  })
})

module.exports = router
