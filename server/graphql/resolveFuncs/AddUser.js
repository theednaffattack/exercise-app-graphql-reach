const { ExerciseUser } = require("../../models/ExerciseUser");

const AddUser = ({ username }) => {
  // generate a user using our mongoose model
  const exerciseUser = new ExerciseUser({
    username
  });
  // wrapping a Promise here to make it easy to conrol
  // with then blocks or async later
  return new Promise((resolve, reject) => {
    // save
    exerciseUser.save((err, doc) => {
      if(err) {
        log(err)
        reject(err)
      }
  
      let { username } = doc;
      let id =  doc._id.toString();
      
      // otherwise log it on the console and respond
      resolve( {
        username,
        id
      });
    });
  })
  .then((data) => {
    // add the exercises array
    // later we'll fetch more data here
    data.exercises = [];
    return data;
  })
  .catch((error) => {
    console.error(error)
    return error
  });
};

module.exports = { AddUser };