import qs from "querystring";
import React from "react";
import { Box, Flex, Heading, Text } from "rebass";
import { ExerciseQuery } from "./ExerciseQuery";

// sample query params (props.location.search)
// used for Query component
// ?from=2018,10,21&to=2018,10,22&limit=10

const Exercises = (props) => (
  <Box bg="blue" color="white" p={4} width={[1, 1, 1 / 2]} height="100vh">
    <Heading f={[4, 5, 6, 7]}>Exercises</Heading>
   <Text>From: {qs.parse(props.location.search.replace("?","")).from}</Text>
   <Text>To: {qs.parse(props.location.search.replace("?","")).to}</Text>
   <Text>Limit: {parseInt(qs.parse(props.location.search.replace("?","")).limit, 10)}</Text>
    <Flex flexWrap="wrap" mx={-2}>
      <Box px={2} py={2} width={[1, 1, 1]}>
        <ExerciseQuery
          from={qs.parse(props.location.search.replace("?","")).from}
          to={qs.parse(props.location.search.replace("?","")).to}
          limit={parseInt(qs.parse(props.location.search.replace("?","")).limit, 10)}  />
      </Box>
    </Flex>
  </Box>
);

export default Exercises;