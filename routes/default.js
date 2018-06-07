const express = require("express")
const router = express.Router()

const Project = require("../models/Project")
const Post = require("../models/Post")
const Category = require("../models/Category")
const User = require("../models/User")
const PostUpAds = require("../models/PostUpAds")
const PostLoAds = require("../models/PostLoAds")
const SideUpAds = require("../models/SideUpAds")
const SideLoAds = require("../models/SideLoAds")

const middlewares = require("../middlewares/middlewares")

router.get('/', (req, res) => {
  Project.find({}).limit(6).sort({date: -1}).exec((err, projects) => {
    if(err) {
      console.log(err)
    } else {
      Post.find({}).limit(6).sort({dateTime: -1}).exec((err, posts) => {
        if (err) {
          console.log(err)
        } else {
          res.render("pages/home", {
            title: 'Homepage',
            projects,
            posts
          })
        }
      })
    }
  })
})

router.get('/blogs', (req, res) => {
  Post.find({}).limit(8).sort({dateTime: -1}).exec((err, posts) => {
    if (err) {
      console.log(err)
    } else {
      res.render("pages/blogs", {
        title: 'Blogs',
        posts
      })
    }
  })
})

router.get('/blogs/:title', (req, res) => {
  Post.findOne({slug: req.params.title}).exec((err, post) => {
    if(err) {
      console.log(err)
    } else {
      Post.find({}).limit(5).sort({dateTime: -1}).exec((err, posts) => {
        if(err) {
          console.log(err)
        } else {
          Category.find({}).exec((err, cats) => {
            if(err) {
              console.log(err)
            } else {
              User.findOne({username: req.cookies.CodersBD}).populate('postUpAds').exec((err, pua) => {
                User.findOne({username: req.cookies.CodersBD}).populate('postLoAds').exec((err, pla) => {
                  User.findOne({username: req.cookies.CodersBD}).populate('sideUpAds').exec((err, sua) => {
                    User.findOne({username: req.cookies.CodersBD}).populate('sideLoAds').exec((err, sla) => {
                      res.render("pages/blog", {
                        title: post.title,
                        post,
                        posts,
                        cats,
                        pua: pua.postUpAds[0].content,
                        pla: pla.postLoAds[0].content,
                        sua: sua.sideUpAds[0].content,
                        sla: sla.sideLoAds[0].content
                      })
                    })
                  })
                })
              })
            }
          })
        }
      })
    }
  })
})

router.get('/gallery', (req, res) => {
  res.render("pages/gallery", {
    title: 'Gallery'
  })
})

router.get('/forum', (req, res) => {
  res.render("pages/forum", {
    title: 'Forum'
  })
})

router.get('/shop', (req, res) => {
  res.render("pages/shop", {
    title: 'Shop'
  })
})

router.get('/about', (req, res) => {
  res.render("pages/about", {
    title: 'About me'
  })
})

router.get('/contact', (req, res) => {
  res.render("pages/contact", {
    title: 'Contact me'
  })
})

router.get('/login', middlewares.guest, (req, res) => {
  res.render("pages/login", {
    title: 'Login'
  })
})

router.get('/register', middlewares.guest, (req, res) => {
  res.render("pages/register", {
    title: 'Register'
  })
})

router.get("/forgot-password", middlewares.guest, (req, res) => {
  res.render("pages/forgot", {
    title: "Recover Account"
  })
})

router.get("/dashboard/add-projects", middlewares.admin, (req, res) => {
  Project.find({}, (err, projects) => {
    if(err) {
      console.log(err)
    } else {
      res.render("pages/projects", {
        title: "Dashboard",
        projects
      })
    }
  })
})

router.get("/dashboard/all-posts", middlewares.user, (req, res) => {
  Post.find({}).sort({dateTime: -1}).exec((err, posts) => {
    if(err) {
      console.log(err)
    } else {
      User.find({username: req.cookies.CodersBD}).populate('posts').exec((err, userPost) => {
        res.render("pages/allPosts", {
          title: "Dashboard",
          userPosts: userPost[0].posts,
          posts
        })
      })
    }
  })
})

router.get("/dashboard/add-post", middlewares.user, (req, res) => {
  res.render("pages/addPost", {
    title: "Dashboard"
  })
})

router.get("/dashboard/add-category", middlewares.user, (req, res) => {
  Category.find({}, (err, allCats) => {
    if(err) {
      console.log(err)
    } else {
      User.findOne({
        username: req.cookies.CodersBD
      }).populate('categories').exec((err, cats) => {
        if (err) {
          console.log(err)
        } else {
          res.render("pages/category", {
            title: "Dashboard",
            cats: cats.categories,
            allCats
          })
        }
      })
    }
  })
})

router.get("/dashboard/add-advertises", middlewares.user, (req, res) => {
  res.render("pages/ads", {
    title: "Dashboard"
  })
})

router.get("/dashboard/post/:slug/edit", middlewares.user, (req, res) => {
  Post.findOne({slug: req.params.slug}).exec((err, post) => {
    if(err) {
      console.log(err)
    } else {
      res.render('pages/upPost', {
        title: post.title,
        post
      })
    }
  })
})

router.get('/dashboard/cat/:id/edit', middlewares.user, (req, res) => {
  Category.findById(req.params.id, (err, cat) => {
    if(err) {
      console.log(err)
    } else {
      res.render("pages/upCat", {
        title: "Dashboard",
        cat
      })
    }
  })
})

router.get('/dashboard/profile', middlewares.user, (req, res) => {
  User.findOne({username: req.cookies.CodersBD}).exec((err, foundUser) => {
    if(err) {
      console.log(err)
    } else {
      res.render('pages/profile', {
        title: "Dashboard",
        foundUser
      })
    }
  })
})


module.exports = router
