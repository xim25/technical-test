const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const  userSchema = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  active: {
    type: Number,
    default: 1
  },
}, {
  timestamps: {
    createdAt: "creared_at",
    updatedAt: "updated_at"
  }
});

userSchema.plugin(passportLocalMongoose, {usernameField: "username"});

module.exports = mongoose.model("User", userSchema);