import gql from 'graphql-tag'

export default gql`
  query findExercisesByDate($from: Date, $to: Date, $limit: Int) {
    
      findExercisesByDate(
        from: $from,
        to: $to,
        limit: $limit
      ) {
        exerciseId
        description
        userId
        duration
        date
      }
    
  }
`