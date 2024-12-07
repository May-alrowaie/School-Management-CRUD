const express = require("express")

const router = express.Router()

const Student = require("../models/student")

router.get("/", async (req, res) => {
  try {
    const populatedStudents = await Student.find({}).populate("teacher")
    console.log("Populated Students: ", populatedStudents)
    res.render("students/index.ejs", { students: populatedStudents })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
})

router.get("/new", async (req, res) => {
  res.render("students/new.ejs") // render will not have "/" before path
})

router.post("/", async (req, res) => {
  req.body.teacher = req.session.user._id
  await Student.create(req.body)
  res.redirect("/students") // render will have a "/" before path
})

router.get("/:studentId", async (req, res) => {
  try {
    const populatedStudents = await Student.findById(
      req.params.studentId
    ).populate("teacher")
    const userHasFavorited = populatedStudents.favoritedByUsers.some((user) =>
      user.equals(req.session.user._id)
    )
    res.render("students/show.ejs", {
      student: populatedStudents,
      userHasFavorited: userHasFavorited,
    })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
})

router.get("/:studentId/edit", async (req, res) => {
  try {
    const currentStudent = await Student.findById(req.params.studentId)
    res.render("students/edit.ejs", { student: currentStudent })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
})

router.put("/:studentId", async (req, res) => {
  try {
    const currentStudent = await Student.findById(req.params.studentId)
    if (currentStudent.teacher.equals(req.session.user._id)) {
      await currentStudent.updateOne(req.body)
      res.redirect("/students")
    } else {
      res.send("You don't have permission to do that ")
    }
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
})

router.delete("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId)
    if (student.teacher.equals(req.session.user._id)) {
      await student.deleteOne()
      res.redirect("/students")
    } else {
      res.send("You don't have permission to do that")
    }
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
})

//favorite It!
router.post("/:studentId/favorited-by/:userId", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.studentId, {
      $push: { favoritedByUsers: req.params.userId }, //push is part of array method "favoritedByUsers" "$" is for updating the documents
    })
    res.redirect(`/students/${req.params.studentId}`)
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
})

//Unfavorite It!
router.delete("/:studentId/favorited-by/:userId", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.studentId, {
      $pull: { favoritedByUsers: req.params.userId },
    })
    res.redirect(`/students/${req.params.studentId}`)
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
})

module.exports = router
