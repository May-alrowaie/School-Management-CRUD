const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()

const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")

const isSignedIn = require("./middleware/is-signed-in")
const passUserToView = require("./middleware/pass-user-to-view")

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3001"

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }))
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"))
// Morgan for logging HTTP requests
app.use(morgan("dev"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(passUserToView)

app.use((req, res, next) => {
  if (req.session.message) {
    res.locals.message = req.session.message
    req.session.message = null
  } else {
    res.locals.message = null
  }

  next()
})
const authController = require("./controllers/auth")
const studentController = require("./controllers/students")

app.use("/auth", authController)
app.use("/students", isSignedIn, studentController)

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`)
})

// //landing page

// render.render()

// server.js

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs")
})
