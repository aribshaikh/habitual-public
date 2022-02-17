const router = require("express").Router();
let User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//import app from "../server";

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post(async (req, res) => {
  const isUniqueUser = await User.iuUniqueUsername(req.body.username);
  if (!isUniqueUser) {
    return res.json({
      success: false,
      message: "This username is already in use, pick a different name",
    });
  }
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    newUser
      .save()
      .then(res.send({ message: "User added!", newUser }))
      .catch((err) => res.status(400).json("Error:" + err));
  });
});

router.route("/login").post((req, res) => {
  console.log("got here");
  User.findOne({ username: req.body.username }, (err, user) => {
    console.log("got heree");
    if (user) {
      bcrypt.compare(req.body.password, user.password, (error, response) => {
        if (response) {
          console.log("sending back");
          res.send({ message: "Log in Successful", user });
        } else {
          res.send({ message: "Wrong username/password" });
        }
      });
    } else {
      res.send({ message: "User not siged up" });
    }
  });
});

app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});
module.exports = router;