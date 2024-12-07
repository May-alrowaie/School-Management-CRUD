// models/listing.js

const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema(
  {
    school: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      min: 0,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    favoritedByUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
)

const Student = mongoose.model("Student", StudentSchema)

module.exports = Student
