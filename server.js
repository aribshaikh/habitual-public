//const app = require("./App.js");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
let User = require("./models/UserModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const favicon = require("express-favicon");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());
//app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "habitual",
    resave: false,
    saveUninitialized: false,
    cooke: {
      expires: 60 * 60 * 24,
      httpOnly: true,
    },
  })
);

const postsRouter = require("./routes/Post");
const assessRouter = require("./routes/Assessment");
//const usersRouter = require("./routes/User");
const habitsRouter = require("./routes/Habit");

// USER ROUTES

// GET Users
app.get("/users/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

// DELETE Users
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  // Delete a user by their id
  try {
		const user = await User.findByIdAndRemove(id)
		if (!user) {
			res.status(404).send()
		} else {   
			res.send({message: "User deleted succesfully", user})
		}
	} catch(error) {
		console.log(error)
		res.status(500).send() // server error, could not delete.
	}
});
// GET /users/id
app.get("/users/getUsers/:id", async (req, res) => {
  // Add code here
  const id = req.params.id;

  // If id valid, findById
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("Resource not found"); // could not find this user
    } else {
      /// sometimes we might wrap returned object in another object:
      //res.send({user})
      res.send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error"); // server error
  }
});

app.post("/users/add", async (req, res) => {
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
      selectedHabits: [],
    });
    newUser
      .save()
      .then(res.send({ message: "User added!", newUser }))
      .catch((err) => res.status(400).json("Error:" + err));
  });
});

app.post("/users/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (error, response) => {
        if (response) {
          req.session.user = user;
          console.log(req.session.user);
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

app.get("/users/login", (req, res) => {
  //   console.log("requesting session first");
  if (req.session.user) {
    console.log("requesting session");
    res.send({
      loggedIn: true,
      user: req.session.user.username,
      name: req.session.user.name,
      userId: req.session.user._id,
      selectedHabits: req.session.user.selectedHabits,
    });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/users/logout", (req, res) => {
  console.log("deletting");
  // Remove the session
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});
app.post("/users/addAsssessment/:id", async (req, res) => {
  const id = req.params.id;
  const day = new Date();
  // const newAssess = new Assessment({
  //   date: day.getDate() + '/' + (day.getMonth()+1) + '/' + day.getFullYear(),
  //   result: req.body.result
  // });

  const newAssess = {
    date: day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear(),
    result: req.body.result,
  };

  // ATTEMPT 2
  // function contains(arr, key, val) {
  //   console.log(arr.length);
  //   for (var i = 0; i < arr.length; i++) {
  //     // console.log(arr[i].habit);
  //     // console.log(val);
  //     if (arr[i].date === val){
  //       return true;
  //     }
  //   }
  //   return true;
  // }
  // const user = await User.findById(id);

  // try {
  //   const checker = contains(user.assessments, "assessment", newAssess.date);
  //   if (!checker){
  //     const addAssessment = await User.findByIdAndUpdate(
  //       id,
  //       { $push: { assessments: newAssess }  },
  //       { new: true }
  //     );
  //     if (!addAssessment) {
  //       res.status(404).send();
  //     } else {
  //       res.send({newAssess, addAssessment });
  //     }

  //   }
  //   else{
  //     res.send(user);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send("Internal Server Error"); // server error
  // }

  // END OF ATTEMPT 2

  //ATTEMPT 3 FIND ONE AND UPDATE
  // const user = await User.findById(id);

  // let update = await user.assessments.findOneAndUpdate(newAssess.date, newAssess.result, {new: true});
  // END
  const user = await User.findById(id);
  try {
    // BUG HERE -> ADDS DUPLICATES
    const add = await User.findByIdAndUpdate(
      { _id: id },
      { $push: { assessments: newAssess } },
      { unique: true, dropDups: true }
      //{ new: true },
      //{runValidators: true}
      //{upsert: true, new : true}
    );
    if (!add) {
      res.status(404).send();
    } else {
      res.send({ add });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error"); // server error
  }
});

app.post("/users/addHabit/:id", async (req, res) => {
  // Add code here
  const id = req.params.id;
  console.log("This the body im receiving" + req.body.habit);
  const habit = {
    habit: req.body.habit,
  };

  function contains(arr, key, val) {
    console.log(arr.length);
    for (var i = 0; i < arr.length; i++) {
      // console.log(arr[i].habit);
      // console.log(val);
      if (arr[i].habit === val) {
        return true;
      }
    }
    return false;
  }
  const user = await User.findById(id);
  // console.log(user.selectedHabits)
  // console.log('This is chcker' + checker);
  try {
    const checker = contains(user.selectedHabits, "habit", req.body.habit);
    if (!checker) {
      const addHabit = await User.findByIdAndUpdate(
        id,
        { $push: { selectedHabits: habit } },
        { new: true }
      );
      if (!addHabit) {
        res.status(404).send();
      } else {
        res.send({ habit, addHabit });
      }
    } else {
      res.send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error"); // server error
  }
});

// For USER to DELETE a selected habit
app.delete("/users/:id/:habit_id", async (req, res) => {
  // Add code here
  const id = req.params.id;
  const habit_id = req.params.habit_id;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send();
    } else {
      const delete_habit = user.selectedHabits.id(habit_id);
      user.selectedHabits.remove(habit_id);

      const result = await user.save();
      if (!result) {
        res.status(404).send();
      } else {
        res.send({ user: delete_habit, user: user });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error"); // server error
  }
});

app.use("/posts", postsRouter);
app.use("/habits", habitsRouter);
app.use("/assessments", assessRouter);

//app.use("/users", usersRouter);

//if (process.env.NODE_ENV === "production") {
app.use(express.static(__dirname + "/habitual/build"));
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/habitual/build/index.html");
});
//}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
