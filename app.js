const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyparser = require("body-parser");
const loginRoute = require("./routes/users");
const jwt = require("jsonwebtoken");
const bookDetailsRoute = require("./routes/bookdetails");
const secret = process.env.secret;
mongoose.connect(
  `mongodb://${process.env.user}:${process.env.pass}@ac-kof8i2l-shard-00-00.eqvbavg.mongodb.net:27017,ac-kof8i2l-shard-00-01.eqvbavg.mongodb.net:27017,ac-kof8i2l-shard-00-02.eqvbavg.mongodb.net:27017/${process.env.db}?ssl=true&replicaSet=atlas-1k2p6j-shard-0&authSource=admin&retryWrites=true&w=majority`,
  (err) => {
    if (!err) {
      console.log("Connected to DB");
    } else {
      console.log(err.message);
    }
  }
);
const app = express();

app.use(cors());
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
          status: "failed",
          message: err,
        });
      }
      //add id property to req object

      req.id = decoded.data;
      console.log(req.id);
      console.log(decoded);
      next();
    });
  }
});
app.use("/v1/bookdetails", bookDetailsRoute);

app.listen(5000, () => console.log(`Server is listening at port 5000`));
