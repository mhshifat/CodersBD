const express = require("express")
const path = require("path")
const fs = require("fs")
const router = express.Router()

const Project = require("../models/Project")
const Post = require("../models/Post")
const User = require("../models/User")
const PostUpAds = require("../models/PostUpAds")
const PostLoAds = require("../models/PostLoAds")
const SideUpAds = require("../models/SideUpAds")
const SideLoAds = require("../models/SideLoAds")

router.post('/post', (req, res) => {
  if (!req.body.title || !req.body.content || !req.body.author || !req.body.category || !req.body.tags || !req.files.image) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/add-post")
  } else {
    if (req.files.image.mimetype === 'image/png' || req.files.image.mimetype === 'image/jpg' || req.files.image.mimetype === 'image/jpeg') {
      const title = req.body.title
      const slug = title.replace(/\s/g, '-').toLowerCase()
      Post.findOne({
        slug: slug
      }).exec((err, post) => {
        if (err) {
          console.log(err)
        } else {
          if (post) {
            req.flash("error", "Please choose a different title")
            res.redirect("/dashboard/add-post")
          } else {
            const image = req.files.image
            const imageName = Date.now() + '-' + image.name
            image.mv(path.join(__dirname, "../public/uploads/" + imageName), (err, image) => {
              if (err) {
                console.log(err)
                req.flash("error", "Something went wrong, please try again letter")
                res.redirect("/dashboard/add-projects")
              } else {
                User.findOne({
                  username: req.cookies.CodersBD
                }, (err, user) => {
                  const postUpAds = user.postUpAds
                  const postLoAds = user.postLoAds
                  const sideUpAds = user.sideUpAds
                  const sideLoAds = user.sideLoAds

                  const post = {
                    title: req.body.title,
                    content: req.body.content,
                    slug: slug,
                    author: req.body.author,
                    category: req.body.category,
                    tags: req.body.tags,
                    image: imageName,
                    username: req.cookies.CodersBD,
                    postUpAds: postUpAds,
                    postLoAds: postLoAds,
                    sideUpAds: sideUpAds,
                    sideLoAds: sideLoAds
                  }
                  Post.create(post, (err, post) => {
                    if (err) {
                      console.log(err)
                    } else {
                      User.findOne({
                        username: req.cookies.CodersBD
                      }, (err, user) => {
                        if (err) {
                          console.log(err)
                        } else {
                          user.posts.push(post)
                          user.save(err => {
                            if (err) {
                              console.log(err)
                            } else {
                              req.flash("success", "Your post has been added")
                              res.redirect("/dashboard/all-posts")
                            }
                          })
                        }
                      })
                    }
                  })
                })
              }
            })
          }
        }
      })
    } else {
      req.flash("error", "Please choose an image file")
      res.redirect("/dashboard/add-post")
    }
  }
})

router.post('/upPost/:id', (req, res) => {
  if (!req.body.title || !req.body.content || !req.body.author || !req.body.category || !req.body.tags) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/add-post")
  } else {
    Post.findById(req.params.id, (err, foundPost) => {
      if(err) {
        console.log(err)
      } else {
        let upImage = foundPost.image
        if(req.files.image) {
          if (req.files.image.mimetype === 'image/png' || req.files.image.mimetype === 'image/jpg' || req.files.image.mimetype === 'image/jpeg') {
            const image = req.files.image
            const imageName = Date.now() + '-' + image.name
            image.mv(path.join(__dirname, "../public/uploads/" + imageName), (err, image) => {
              if (err) {
                console.log(err)
                req.flash("error", "Something went wrong, please try again letter")
                res.redirect("/dashboard/add-projects")
              } else {
                fs.unlink(path.join(__dirname, "../public/uploads/" + upImage), (err) => {
                  User.findOne({username: req.cookies.CodersBD}, (err, user) => {
                    const postUpAds = user.postUpAds
                    const postLoAds = user.postLoAds
                    const sideUpAds = user.sideUpAds
                    const sideLoAds = user.sideLoAds

                    const title = req.body.title
                    const slug = title.replace(/\s/g, '-').toLowerCase()
                    const post = {
                      title: req.body.title,
                      content: req.body.content,
                      slug: slug,
                      author: req.body.author,
                      category: req.body.category,
                      tags: req.body.tags,
                      image: imageName,
                      username: req.cookies.CodersBD,
                      postUpAds: postUpAds,
                      postLoAds: postLoAds,
                      sideUpAds: sideUpAds,
                      sideLoAds: sideLoAds
                    }
                    Post.findByIdAndUpdate(req.params.id, post, (err, post) => {
                      if (err) {
                        console.log(err)
                      } else {
                        req.flash("success", "Your post has been added")
                        res.redirect("/dashboard/all-posts")
                      }
                    })
                  })
                })
              }
            })
          } else {
            req.flash("error", "Please choose an image file")
            res.redirect(`/dashboard/post/${foundPost.slug}/edit`)
          }
        } else {
          User.findOne({username: req.cookies.CodersBD}, (err, user) => {
            const postUpAds = user.postUpAds
            const postLoAds = user.postLoAds
            const sideUpAds = user.sideUpAds
            const sideLoAds = user.sideLoAds

            const title = req.body.title
            const slug = title.replace(/\s/g, '-').toLowerCase()
            const post = {
              title: req.body.title,
              content: req.body.content,
              slug: slug,
              author: req.body.author,
              category: req.body.category,
              tags: req.body.tags,
              image: upImage,
              username: req.cookies.CodersBD,
              postUpAds: postUpAds,
              postLoAds: postLoAds,
              sideUpAds: sideUpAds,
              sideLoAds: sideLoAds
            }
            Post.findByIdAndUpdate(req.params.id, post, (err, post) => {
              if (err) {
                console.log(err)
              } else {
                req.flash("success", "Your post has been added")
                res.redirect("/dashboard/all-posts")
              }
            })
          })
        }
      }
    })
  }
})

router.post("/dashboard/post/:id/delete", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, done) => {
    if(err) {
      console.log(err)
    } else {
      fs.unlink(path.join(__dirname, "../public/uploads/" + done.image), (err) => {
        req.flash("success", "Your post has been deleted")
        res.redirect("/dashboard/all-posts")
      })
    }
  })
})

router.get('/post/:id/published', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {status: 'Not Published'}, (err) => {
    if(err) {
      console.log(err)
    } else {
      req.flash("success", "1 post status has been changed to 'Not Published'")
      res.redirect("/dashboard/all-posts")
    }
  })
})

router.get('/post/:id/notPublished', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {status: 'Published'}, (err) => {
    if(err) {
      console.log(err)
    } else {
      req.flash("success", "1 post status has been changed to 'Published'")
      res.redirect("/dashboard/all-posts")
    }
  })
})

module.exports = router
