const router = require("express").Router();
let Habit = require("../models/HabitModel");

router.route("/").get(async (req, res) => {
  await Habit.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").delete(async (req, res) => {
  console.log(req.body.id)
  console.log(req.id)
  const habit = await Habit.findByIdAndRemove(req.body.id)
		if (!habit) {
			res.status(404).send()
		} else {   
			res.send({message: "Habit Deleted Successfully",habit})
		}
});

router.route("/add").post(async (req, res) => {
  const newHabit = new Habit({
    name: req.body.name,
    habit1: req.body.habit1,
    habit2: req.body.habit2,
    habit3: req.body.habit3,
  });

  await newHabit
    .save()
    .then(() => res.json("Habit added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
