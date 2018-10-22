const { gql } = require("apollo-server-express");

// The GraphQL schema
const typeDefs = gql`
  scalar Date
  type Query {
    "A simple type for getting started!"
    hello: String
    findExercisesByDate(from: Date, to: Date, limit: Int): [Exercise]
    user: User
    users: [User]
  }

  type User {
    id: String
    username: String
    exercises: [Exercise]
  }

  type Exercise {
    exerciseId: String
    userId: String
    description: String
    duration: Int
    date: Date
  }
  type Mutation {
    addUser(username: String, id: String): User
    addExercise(date: String, description: String, duration: Int, userId: String): Exercise
  }
  
`;

module.exports = typeDefs;



