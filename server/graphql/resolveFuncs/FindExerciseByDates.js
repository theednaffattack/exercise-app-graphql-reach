const format = require("date-fns/format");
const { Exercise } = require("../../models/Exercise");

const FindExercisesByDate = (from, to, limit) => {
  console.log()
  console.log("limit")
  console.log(limit)
  let query = Exercise.find({
    createdAt: {
      $gte: new Date(2018, 9, 18), 
      $lt: new Date(2018, 9, 22)
    }
  })
  .limit(limit)

  return new Promise((resolve, reject) => {
    query.exec(function(err,docs){
      if(err) reject(err);
      console.log("docs")
      console.log(docs)
      resolve(docs); 
    })
  })
  .then(exercisesFromDb => {
    let exercisesForClient = exercisesFromDb.map(x => {
      let newX = {};
      newX.date = format(x.updatedAt, "ddd MMM DD YYYY");
      newX.exerciseId = x._id.toString();
      newX.userId = x.userId.toString();
      newX.duration = x.duration;
      newX.description = x.description;
      return newX;
    })
    return exercisesForClient;
  })
  .catch(err => err);
};

module.exports = { FindExercisesByDate };