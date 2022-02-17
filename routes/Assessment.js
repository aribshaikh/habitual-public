const router = require("express").Router();
let Assessment = require("../models/AssessmentModel");

router.route("/").get(async (req, res) => {
    await Assessment.find()
      .then((assessment) => res.json(assessment))
      .catch((err) => res.status(400).json("Error:" + err));
  });

router.route("/add").post(async (req, res) => {
  const day = new Date()
  const newAssess = new Assessment({
    date: day.getDate() + '/' + (day.getMonth()+1) + '/' + day.getFullYear(),
    result: req.body.result
  });
  //console.log("adding")
  await newAssess
    .save()
    .then(() => res.json("Assessment Added!"))
    .catch((err) => res.status(400).json("Error:" + err));
  console.log("This the body im receiving" + req.body.result);
});
 
module.exports = router;
