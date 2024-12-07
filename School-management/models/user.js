const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [3, "Name must be more than 3 characters!!"],
      maxlength: [
        10,
        "The Password is too long!! maximum length is 10 characters",
      ],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // means createdAt at and updatedAt
  }
)
const User = mongoose.model("User", userSchema)
module.exports = User
