const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs")
})

router.post("/sign-up", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (userInDatabase) {
    return res.send("Username already taken ")
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match")
  }

  //Register the user

  //hcrypt to encrept the password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  const user = await User.create(req.body)
  res.send(`Thanks for signing up ${user.username}`)
})

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs")
})

router.post("/sign-in", async (req, res) => {
  try {
    //res.send("Request to sign in received!")
    const userInDatabase = await User.findOne({ username: req.body.username }) //
    if (!userInDatabase) {
      return res.send("Login failed. Please try again.")
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    )
    if (!validPassword) {
      return res.send("Login failed. Please try again.")
    }
    //log the user in
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    }
    req.session.message = "User logged in successfully"
    res.redirect("/")
  } catch (err) {
    console.log(err)
    req.session.message = "Please try again later"
    // req.session.message= "Please try again later"
  }
})

router.get("/sign-out", (req, res) => {
  req.session.destroy()
  res.redirect("/")
})

module.exports = router
