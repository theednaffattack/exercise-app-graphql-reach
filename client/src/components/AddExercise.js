import React from 'react';
import {
  Banner, Box, Flex, Heading, Text,
} from 'rebass';
import styled from 'styled-components';

import AddExerciseFormContainer from './AddExerciseFormContainer';

const RoundedBanner = styled(Banner)`
  border-radius: 25px;
`;

const AddExercise = () => (
  <Box bg="blue" color="white" p={4} width={[1, 1, 1 / 2]}>
    <Heading f={[4, 5, 6, 7]}>Add Exercise</Heading>
    <Flex flexWrap="wrap" mx={-2}>
      <Box px={2} py={2} width={[1, 1, 1]}>
        <AddExerciseFormContainer />
      </Box>
    </Flex>
  </Box>
);

export default AddExercise;
