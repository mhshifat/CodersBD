// Dependencies
const express = require("express")
const colors = require("colors")
const layout = require("express-ejs-layouts")
const fileupload = require("express-fileupload")
const bodyParser = require("body-parser")
const session = require("express-session")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")

// Database
require("./database/conn")

// Seeds
require("./seeds/seed")

// Require Local Files
const config = require("./config/config")

// Models
const User = require("./models/User")
const PostUpAds = require("./models/PostUpAds")
const PostLoAds = require("./models/PostLoAds")
const SideUpAds = require("./models/SideUpAds")
const SideLoAds = require("./models/SideLoAds")

// Require Routes
const defaultRoutes = require("./routes/default")
const projectsRoutes = require("./routes/projects")
const postsRoutes = require("./routes/posts")
const categoriesRoutes = require("./routes/categories")
const registerRoutes = require("./routes/register")
const loginRoutes = require("./routes/login")
const adsRoutes = require("./routes/ads")

// Start The App
const app = express()

// Use Of Middlewares
app.use(layout)
app.set("view engine", "ejs")
app.set("layout", "layouts/main")
app.use(express.static("public"))

app.use(session({
  secret: "CodersBD",
  resave: true,
  saveUninitialized: false
}))
app.use(flash())
app.use(fileupload())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Custom Middlewares
app.use((req, res, next) => {
  res.locals.user = req.cookies.CodersBD;
  res.locals.error = req.flash("error")
  res.locals.success = req.flash("success")
  next()
});

app.use((req, res, next) => {
  if (req.cookies.CodersBD) {
    User.findOne({username:req.cookies.CodersBD}).exec((err, user) => {
      if(user.isAdmin === false) {
        res.locals.admin = false
        next()
      } else {
        res.locals.admin = true
        next()
      }
    })
  } else {
    res.locals.admin = false
    next()
  }
})

app.use((req, res, next) => {
  if (!req.cookies.CodersBD) {
    next()
  } else {
    User.findOne({username: req.cookies.CodersBD}, (err, localUser) => {
      if(err) {
        console.log(err)
      } else {
        if(localUser.postUpAds.length == 0) {
          PostUpAds.create({content: 'Ads No 1'}, (err, ad_1) => {
            if(err) {
              console.log(err)
            } else {
              localUser.postUpAds.push(ad_1)
              localUser.save(err => {
                if(err) {
                  console.log(err)
                } else {
                  next()
                }
              })
            }
          })
        } else {
          next()
        }
      }
    })
  }
})


app.use((req, res, next) => {
  if (!req.cookies.CodersBD) {
    next()
  } else {
    User.findOne({username: req.cookies.CodersBD}, (err, localUser) => {
      if(err) {
        console.log(err)
      } else {
        if(localUser.postLoAds.length == 0) {
          PostLoAds.create({content: 'Ads No 2'}, (err, ad_2) => {
            if(err) {
              console.log(err)
            } else {
              localUser.postLoAds.push(ad_2)
              localUser.save(err => {
                if(err) {
                  console.log(err)
                } else {
                  next()
                }
              })
            }
          })
        } else {
          next()
        }
      }
    })
  }
})


app.use((req, res, next) => {
  if (!req.cookies.CodersBD) {
    next()
  } else {
    User.findOne({username: req.cookies.CodersBD}, (err, localUser) => {
      if(err) {
        console.log(err)
      } else {
        if(localUser.sideUpAds.length == 0) {
          SideUpAds.create({content: 'Ads No 3'}, (err, ad_3) => {
            if(err) {
              console.log(err)
            } else {
              localUser.sideUpAds.push(ad_3)
              localUser.save(err => {
                if(err) {
                  console.log(err)
                } else {
                  next()
                }
              })
            }
          })
        } else {
          next()
        }
      }
    })
  }
})

app.use((req, res, next) => {
  if (!req.cookies.CodersBD) {
    next()
  } else {
    User.findOne({username: req.cookies.CodersBD}, (err, localUser) => {
      if(err) {
        console.log(err)
      } else {
        if(localUser.sideLoAds.length == 0) {
          SideLoAds.create({content: 'Ads No 4'}, (err, ad_4) => {
            if(err) {
              console.log(err)
            } else {
              localUser.sideLoAds.push(ad_4)
              localUser.save(err => {
                if(err) {
                  console.log(err)
                } else {
                  next()
                }
              })
            }
          })
        } else {
          next()
        }
      }
    })
  }
})

// Use Of Routes
app.use(defaultRoutes)
app.use(projectsRoutes)
app.use(postsRoutes)
app.use(categoriesRoutes)
app.use(registerRoutes)
app.use(loginRoutes)
app.use(adsRoutes)

app.get("*", (req, res) => {
  res.render("pages/notFound", {
    title: "Page Not Found"
  })
})

// Listening To Port
app.listen(config.port, () => {
  console.log(colors.green(`The Server Has Started On >>> http://localhost:${config.port}`))
})
