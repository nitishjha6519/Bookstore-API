const express = require("express");
const loginModel = require("../models/users");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secret = "mongo";

router.post("/signup", async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);
    // bcrypt.hash(password, 10, async (err, hash) => {
    //   if (err) {
    //     return res.status(500).json({
    //       status: "failed",
    //       message: err,
    //     });
    //   }
    const user = await loginModel.create({
      email,
      password: password,
    });
    // });
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);

    const user = await loginModel.find({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "User is not registered",
      });
    }

    if (user[0].password === password) {
      let token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: user._id,
        },
        secret
      );

      res.status(200).json({
        status: "success",
        message: "login successsful",
        token: token,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

module.exports = router;
