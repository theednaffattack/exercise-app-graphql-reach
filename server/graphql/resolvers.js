const { GraphQLScalarType } = require('graphql');
const { Exercise } = require("../models/Exercise");
const { ExerciseUser } = require("../models/ExerciseUser");
const chalk = require("chalk");
const format = require("date-fns/format");
const { log } = console;
const { AddUser } = require("../graphql/resolveFuncs/AddUser");
const { AddExercise } = require("../graphql/resolveFuncs/AddExercise");
const { FindExercisesByDate } = require("../graphql/resolveFuncs/FindExerciseByDates");

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
    findExercisesByDate: (obj, { from, to, limit }) => {
      return FindExercisesByDate(
        format(from, "ddd MMM DD YYYY"),
        format(to, "ddd MMM DD YYYY"),
        limit
        )
    },
    user: () => {
      return {
        username: 'single user',
        id: 'someID',
        exercises: [{
          userId: "iddddddd",
          description: "some description",
          duration: "1 hour",
          date: new Date()
        }]
      }
    },
    users: () => {
      return [{
        username: 'single user 1',
        id: 'someID',
        exercises: [{
          userId: "iddddddd",
          description: "some description",
          duration: "1 hour",
          date: "today"
        }]},{
          username: 'single user 2',
          id: 'someID',
          exercises: [{
            userId: "iddddddd",
            description: "some description",
            duration: "1 hour",
            date: "today"
          }]
      }]
    }
  },
  Mutation: {
    addUser: (obj, { username }) => {
      return AddUser({ username })
    },
    addExercise: (obj, { date, description, duration, userId }) => {
      return AddExercise({ description, duration, userId })
      .then((data)=>{
        ExerciseUser.findOne({ _id: data.userId }, function (err, doc){
          if(err) {
            console.error(JSON.stringify(err,null,2))
            return err
          };
          let newData = {};
          newData.userId = data._id;
          newData.description = data.description;
          newData.duration = data.duration;
          newData.exerciseId = data.exerciseId;
          newData.date = data.date;
          doc.exercises.push(newData);
          doc.save()
          .then((finalReturn) => finalReturn)
          .catch((err) => console.error(err));
        });
        
        return data;
      })
      .catch((err) => {
        console.error(JSON.stringify(err, null, 2))
        return;
      });
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date scalar type ex: "Sun Oct 21 2018"',
    parseValue(value) {
      return format(new Date(value), "ddd MMM DD YYYY"); // value from the client
    },
    serialize(value) {
      return value; //value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      // if (ast.kind === Kind.STRING) {
      //   return value.toString(); //parseInt(ast.value, 10); // ast value is always in string format
      // }
      return ast.toString();
    },
  }),
};

module.exports = resolvers;