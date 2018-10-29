// import { ExerciseUser } from "../../models/ExerciseUser";
const { ExerciseUser } = require("../../models/ExerciseUser");

const { log } = console;

const FindUserById = exerciseUserId =>
  ExerciseUser.findById(exerciseUserId)
    .exec()
    .then(data => {
      log(data);
      return data;
    })
    .catch(error => log(error));

module.exports = { FindUserById };
