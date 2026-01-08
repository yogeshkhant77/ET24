const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add a username"],
    trim: true,
    unique: true,
    minlength: 3,
  },
  mobile: {
    type: String,
    required: [true, "Please add a mobile number"],
    unique: true,
    match: [/^\d{10}$/, "Please add a valid 10 digit mobile number"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
