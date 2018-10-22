const format = require("date-fns/format");
const mongoose = require("mongoose");

const { Exercise } = require("../../models/Exercise");

const { log } = console;

const AddExercise = ({ date, description, duration, userId }) => {  
  return new Promise((resolve, reject) => {

    let userObjId = new mongoose.mongo.ObjectId(userId);
    // let try2 = mongoose.mongo.BSONPure.ObjectID.fromHexString(userId);
    console.log("userObjId")
    console.log(typeof userObjId)
    console.log(JSON.stringify(userObjId,null,2))
    console.log( mongoose.Types.ObjectId('578df3efb618f5141202a196') );
    // console.log(JSON.stringify(try2,null,2))
    const exercise = new Exercise({
      date,
      description,
      duration,
      userId: mongoose.Types.ObjectId(userId)
    });
    exercise.save((err, doc) => {
      if (err) {
        // return console.error(err);
        reject(err);
      }
      // get the timestamp from the db and translate to our
      // date field.
      let result = {};
      console.log(doc.updatedAt)
      result.date = format(doc.updatedAt, "ddd MMM DD YYYY");
      result.exerciseId = doc._id.toString();
      result.userId = doc.userId.toString();
      result.description = doc.description;
      result.duration = doc.duration;
      resolve(result);
    });
  });

}

module.exports = { AddExercise };