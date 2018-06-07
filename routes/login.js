const express = require("express")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")
const path = require("path")
const fs = require("fs")
const router = express.Router()

const config = require("../config/config")

const Project = require("../models/Project")
const Post = require("../models/Post")
const User = require("../models/User")

const middlewares = require("../middlewares/middlewares")

router.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/login")
  } else {
    User.findOne({email: req.body.email}).exec((err, user) => {
      if(err) {
        console.log(err)
      } else {
        if(!user) {
          req.flash("error", "No user found of this email")
          res.redirect("/login")
        } else {
          if(!user.isActivated) {
            req.flash("error", "Please confirm your email address")
            res.redirect("/login")
          } else {
            bcrypt.compare(req.body.password, user.password, (err, matched) => {
              if(err) {
                console.log(err)
              } else {
                if(!matched) {
                  req.flash("error", "Password is incorrect")
                  res.redirect("/login")
                } else {
                  res.cookie('CodersBD', user.username, {maxAge: 30 * 24 * 3600000})
                  req.flash("success", `Welcome ${user.username}, Glad to have you onboard`)
                  res.redirect("/")
                }
              }
            })
          }
        }
      }
    })
  }
})

router.get('/dashboard/logout', middlewares.user, (req, res) => {
  res.clearCookie('CodersBD')
  req.flash("success", `You have been logged out`)
  res.redirect("/")
})

router.post('/dashboard/reset-password/:id', (req, res) => {
  if (!req.body.password || !req.body.confirmPassword) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/dashboard/profile")
  } else {
    if(req.body.password !== req.body.confirmPassword) {
      req.flash("error", "Password does not match")
      res.redirect("/dashboard/profile")
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashPwd) => {
        if(err) {
          console.log(err)
        } else {
          User.findOneAndUpdate({username: req.cookies.CodersBD}, {password: hashPwd}, (err, done) => {
            if(err) {
              console.log(err)
            } else {
              req.flash("success", "Your account password has been reset")
              res.redirect("/dashboard/profile")
            }
          })
        }
      })
    }
  }
})

router.post('/recover-account', (req, res) => {
  if(!req.body.email) {
    req.flash("error", "Please fill out all fields")
    res.redirect("/forgot-password")
  } else {
    User.findOne({email: req.body.email}).exec((err, user) => {
      if(err) {
        console.log(err)
      } else {
        if(!user) {
          req.flash("error", "A user of this email does not exist")
          res.redirect("/forgot-password")
        } else {
          const url = `${config.url}/reset-password/${user.token}`
          // Send Email
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
              user: config.user,
              pass: config.pass
            }
          })
          let mail = {
            from: 'CodersBD',
            to: req.body.email,
            subject: "Email Verification",
            html: `<table style="margin: 0 auto;" bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="10" width="500" id="m_1515130468911101156emailBody">
                            <tbody>
                              <tr>
                                <td align="center" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                      <tr>
                                        <td align="center" valign="top">
                                          <table border="0" cellpadding="30" cellspacing="0" width="500" class="m_1515130468911101156flexibleContainer">
                                            <tbody>
                                              <tr>
                                                <td valign="top" width="500" class="m_1515130468911101156flexibleContainerCell">
                                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td valign="top" class="m_1515130468911101156textContent">
                                                          <h3 style="color:#1f7189;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:22px;font-weight:bold;margin-top:0px;margin-bottom:3px;text-align:left"> 	Hey ${user.username},</h3>
                                                          <br>
                                                          <div style="margin-top:20px;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5f5f5f;line-height:135%"> CodersBD recently received a request for a forgotten password.If you did not request this change, you do not need to do anything.To change your Upwork password, please click on this<br><br> Please click the link below to
                                                            confirm your email.
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                      <tr style="padding-top:0">
                                        <td align="center" valign="top">
                                          <table border="0" cellpadding="30" cellspacing="0" width="500" class="m_1515130468911101156flexibleContainer">
                                            <tbody>
                                              <tr>
                                                <td style="padding-top:0" align="center" valign="top" width="500" class="m_1515130468911101156flexibleContainerCell">
                                                  <table border="0" cellpadding="0" cellspacing="0" width="50%" class="m_1515130468911101156emailButton" style="background:#ff4a00;border-radius:2px">
                                                    <tbody>
                                                      <tr>
                                                        <td align="center" valign="middle" class="m_1515130468911101156buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px">
                                                          <a href="${url}" style="cursor:pointer;color:#ffffff;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:135%"> Confirm Email</a>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                      <tr>
                                        <td align="center" valign="top">
                                          <table border="0" cellpadding="0" cellspacing="0" width="500" class="m_1515130468911101156flexibleContainer">
                                            <tbody>
                                              <tr>
                                                <td align="center" valign="top" width="500" class="m_1515130468911101156flexibleContainerCell">
                                                  <table class="m_1515130468911101156flexibleContainerCellDivider" border="0" cellpadding="30" cellspacing="0" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td align="center" valign="top" style="padding-top:0px;padding-bottom:0px">
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>

                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                      <tr>
                                        <td align="center" valign="top">
                                          <table border="0" cellpadding="30" cellspacing="0" width="500" class="m_1515130468911101156flexibleContainer">
                                            <tbody>
                                              <tr>
                                                <td valign="top" width="500" class="m_1515130468911101156flexibleContainerCell">
                                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td valign="top" class="m_1515130468911101156textContent">
                                                          <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5f5f5f;line-height:135%">
                                                            <a href="" style="float:left;display:inline-block;margin-right:8px" target="_blank"><img src="https://ci6.googleusercontent.com/proxy/Jjf8NmiQO-SIKKaFFe3ZutGrSjWF16r3ogATP3akLOLQ6Wp18g_WM8QgyYd7VWu50YQ5m5TyeW_UiT0hxoN2BdAKM4kyUsyBoipxG5auJObP5Jr1Zygo=s0-d-e1-ft#https://devdojo.com/uploads/images/emails/facebook-1474217178.png" style="max-width:18px" class="CToWUd"></a>
                                                            <a href="" style="float:left;display:inline-block;margin-right:10px" target="_blank"><img src="https://ci5.googleusercontent.com/proxy/Ogo5jKQA6R0vNQS_5Udt9vB3lvlOb8_e0HiFUcdCjJTLNZQnebW5XFjAn2yaHHzCl8U_0Sc39eSbFQtgd5xEIKwYWJ7M9zRHJqXcxQC2OBrHqUFNCWBsPw=s0-d-e1-ft#https://devdojo.com/uploads/images/emails/instagram-1474217178.png" style="max-width:18px" class="CToWUd"></a>
                                                            <a href="" style="float:left;display:inline-block;margin-right:10px" target="_blank"><img src="https://ci4.googleusercontent.com/proxy/wxI8kCZKke0WTTI4s3Gqvx-c2cKSTjCQMdwSzzgo8Ew-qGh9GBDkremmgzibXF_WlJ3bWZxKAv1_XEBLHhrb5PVttJk_Wo0DlXxXljqpVEE_lsbC0C0=s0-d-e1-ft#https://devdojo.com/uploads/images/emails/twitter-1474217178.png" style="max-width:18px" class="CToWUd"></a>
                                                          </div>
                                                        </td>
                                                        <td valign="top" class="m_1515130468911101156textContent">
                                                          <div style="text-align:right;font-weight:light;font-family:Helvetica,Arial,sans-serif;font-size:12px;margin-bottom:0;margin-top:3px;color:#5f5f5f;line-height:135%">
                                                            <a href="${config.url}" target="_blank">Home</a> <span style="color:#cfcfcf;display:inline-block;margin:0px 5px">|</span> <a href="${config.url}/login" target="_blank">Login</a>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>`

          }
          transporter.sendMail(mail, (err, send) => {
            if (err) {
              console.log(err)
            } else {
              req.flash("success", "Please confirm your email address")
              res.redirect("/forgot-password")
            }
          })
        }
      }
    })
  }
})

router.get('/reset-password/:token',  (req, res) => {
  User.findOne({token: req.params.token}).exec((err, user) => {
    if(err) {
      console.log(err)
    } else {
      if(user.token === req.params.token) {
        res.cookie("CodersBD", user.username, {maxAge: 30 * 24 * 3600000})
        req.flash("success", "Please reset your password for the next time")
        res.redirect("/")
      }
    }
  })
})

module.exports = router
