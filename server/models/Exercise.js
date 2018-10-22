const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExerciseUser',
    required: true
  }
},
{
  timestamps: true
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = { Exercise, exerciseSchema };
