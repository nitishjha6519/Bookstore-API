const express = require("express");
const loginModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secret = "mongo";

router.post("/signup", async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);
    //check if user is already registered
    const user = await loginModel.find({ email });

    if (user.length !== 0) {
      return res.status(400).json({
        status: "failed",
        message: "already registered",
      });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: err,
          reason: "hashing",
        });
      }

      const user = await loginModel.create({
        email,
        password: hash,
      });
      res.status(200).json({
        status: "success",
      });
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

    //check if user registered or not
    console.log(user);
    if (user.length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "User is not registered",
      });
    }

    bcrypt.compare(password, user[0].password, async (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: err.message,
          reason: "hashing",
        });
      }

      let token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: user[0]._id,
        },
        secret
      );

      res.status(200).json({
        status: "success",
        message: "login successsful",
        token: token,
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

module.exports = router;
