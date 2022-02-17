const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HabitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  habit1: {
    type: String,
    required: true,
  },
  habit2: {
    type: String,
    required: true,
  },
  habit3: {
    type: String,
    required: true,
  }
});

const Habit = mongoose.model("Habit", HabitSchema);
module.exports = Habit;
