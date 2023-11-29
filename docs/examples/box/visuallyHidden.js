// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
      <Text>Enable your screen reader to hear the following text:</Text>
      <Box position="relative">
        <Box display="visuallyHidden">Hi there.</Box>
      </Box>
    </Flex>
  );
}
