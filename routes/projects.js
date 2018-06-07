const express = require("express")
const path = require("path")
const fs = require("fs")
const router = express.Router()

const Project = require("../models/Project")

router.post('/project', (req, res) => {
  if(!req.files.project) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/add-projects")
  } else {
    if(req.files.project.mimetype === 'image/png' || req.files.project.mimetype === 'image/jpg' || req.files.project.mimetype === 'image/jpeg') {
      const image = req.files.project
      const imageName = Date.now() + '-' + image.name
      image.mv(path.join(__dirname, "../public/projects/" + imageName), (err, image) => {
        if(err) {
          console.log(err)
          req.flash("error", "Something went wrong, please try again letter")
          res.redirect("/dashboard/add-projects")
        } else {
          Project.create({project: imageName}, (err, DBSavedProject) => {
            if(err) {
              console.log(err)
              req.flash("error", "Something went wrong, please try again letter")
              res.redirect("/dashboard/add-projects")
            } else {
              req.flash("success", "Your project has been added")
              res.redirect("/dashboard/add-projects")
            }
          })
        }
      })
    } else {
      req.flash("error", "Please choose an image file")
      res.redirect("/dashboard/add-projects")
    }
  }
})

router.post('/projects/:id/delete', (req, res) => {
  Project.findByIdAndRemove(req.params.id, (err, project) => {
    fs.unlink(path.join(__dirname, "../public/projects/" + project.project), (err, done) => {
      if (err) {
        console.log(err)
      } else {
        req.flash("success", "Your project has been deleted")
        res.redirect("/dashboard/add-projects")
      }
    })
  })
})

module.exports = router
