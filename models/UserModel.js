const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const selectedHabitSchema = new mongoose.Schema({
    habit: String
});
// const assessmentSchema = new mongoose.Schema({
//   date: {
//     type: String,
//     required: true
//   },
//   result: {
//     type: String,
//     required: true
// }
// });
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  selectedHabits: [selectedHabitSchema],
  assessments: [
    {
      date: {type: String, required: true},
      result: {type: String, required: true}
    }
  ]
});

UserSchema.statics.iuUniqueUsername = async function (username) {
  try {
    const user = await this.findOne({ username });
    if (user) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("error inside uniqueUsername", error.message);
    return false;
  }
};

/* 
UserSchema.statics.isSignedUp = async function (username, password) {
  try {
    const User = this;
    return User.findOne({ username: username }).then((user) => {
      if (!user) {
        return false; // a rejected promise
      }
      // if the user exists, make sure their password is correct
      return true;
    });
  } catch (error) {
    console.log("error inside isSignedUp", error.message);
    return false;
  }
};
*/

const User = mongoose.model("User", UserSchema);
module.exports = User;