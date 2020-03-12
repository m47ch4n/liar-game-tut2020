import React from 'react';
import { Flex, CircularProgress } from '@chakra-ui/core';

export default () => (
  <Flex justify="center" align="center" h="80vh">
    <CircularProgress color="teal" isIndeterminate size="25vw" />
  </Flex>
);
