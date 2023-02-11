const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const loginRoute = require("./routes/users");
const jwt = require("jsonwebtoken");
const bookDetailsRoute = require("./routes/bookdetails");
const secret = "mongo";
mongoose.connect("mongodb://127.0.0.1/bookstore", (err) => {
  if (!err) {
    console.log("Connected to DB");
  } else {
    console.log(err.message);
  }
});
const app = express();

app.use(bodyparser.json());
app.use("/v1/users", loginRoute);
app.use("/v1/bookdetails", async (req, res, next) => {
  if (req.headers.authorization) {
    let BearerToken = req.headers.authorization;
    let token = BearerToken.split(" ")[1];
    console.log(token);

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          sttaus: "failed",
          message: err,
        });
      }

      req.id = decoded.data;
      next();
    });
  }
});
app.use("/v1/bookdetails", bookDetailsRoute);

app.listen(5000, () => console.log(`Server is listening at port 5000`));
