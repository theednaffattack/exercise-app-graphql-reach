const { GraphQLScalarType } = require("graphql");
const chalk = require("chalk");
const format = require("date-fns/format");

const { Exercise } = require("../models/Exercise");
const { ExerciseUser } = require("../models/ExerciseUser");
const { AddUser } = require("../graphql/resolveFuncs/AddUser");
const { FindUserById } = require("../graphql/resolveFuncs/FindUserById");
const { AddExercise } = require("../graphql/resolveFuncs/AddExercise");
const {
  FindExercisesByDate
} = require("../graphql/resolveFuncs/FindExerciseByDates");

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
    findExercisesByDate: (obj, { from, to, limit }) =>
      FindExercisesByDate(
        format(from, "ddd MMM DD YYYY"),
        format(to, "ddd MMM DD YYYY"),
        limit
      ),
    user: (obj, { id }) => FindUserById(id),
    users: () => [
      {
        username: "single user 1",
        id: "someID",
        exercises: [
          {
            userId: "iddddddd",
            description: "some description",
            duration: "1 hour",
            date: "today"
          }
        ]
      },
      {
        username: "single user 2",
        id: "someID",
        exercises: [
          {
            userId: "iddddddd",
            description: "some description",
            duration: "1 hour",
            date: "today"
          }
        ]
      }
    ]
  },
  Mutation: {
    addUser: (obj, { username }) => AddUser({ username }),
    addExercise: (obj, { date, description, duration, userId }) =>
      AddExercise({ description, duration, userId })
        .then(data => {
          ExerciseUser.findOne({ _id: data.userId }, (err, doc) => {
            if (err) {
              console.error(JSON.stringify(err, null, 2));
              return err;
            }
            const newData = {};
            newData.userId = data._id;
            newData.description = data.description;
            newData.duration = data.duration;
            newData.exerciseId = data.exerciseId;
            newData.date = data.date;
            doc.exercises.push(newData);
            doc
              .save()
              .then(finalReturn => finalReturn)
              .catch(err => console.error(err));
          });

          return data;
        })
        .catch(err => {
          console.error(JSON.stringify(err, null, 2));
        })
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: 'Date scalar type ex: "Sun Oct 21 2018"',
    parseValue(value) {
      return format(new Date(value), "ddd MMM DD YYYY"); // value from the client
    },
    serialize(value) {
      return value; // value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      // if (ast.kind === Kind.STRING) {
      //   return value.toString(); //parseInt(ast.value, 10); // ast value is always in string format
      // }
      return ast.toString();
    }
  })
};

module.exports = resolvers;
