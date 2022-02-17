const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    }
});

const Assessment = mongoose.model("Assessment", AssessmentSchema);
module.exports = Assessment