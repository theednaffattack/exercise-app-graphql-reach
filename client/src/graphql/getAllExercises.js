import gql from 'graphql-tag'

export default gql`
  query getAllExercises {
    getAllExercises {
      id
      name
      stakeholders
      coach
      team
      personalEmail
      teamMemberName
      startDate
      position
      tasks {
        task
        taskee
      }
    }
  }
`