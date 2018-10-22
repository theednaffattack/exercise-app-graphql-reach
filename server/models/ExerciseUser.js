const mongoose = require("mongoose");
const { exerciseSchema } = require("./Exercise");

const exerciseUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  exercises: [exerciseSchema]
});

const ExerciseUser = mongoose.model("ExerciseUser", exerciseUserSchema);

module.exports = { ExerciseUser };
