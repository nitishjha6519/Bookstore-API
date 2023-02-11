const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
  },
  { collection: "Users" }
);

const loginModel = mongoose.model("Users", loginSchema);

module.exports = loginModel;
