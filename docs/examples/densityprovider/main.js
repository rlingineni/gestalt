// @flow strict
import { Box, DensityProvider, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      direction="column"
      gap={4}
    >
      <Box
        padding={4}
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="education"
      >
        <Text color="inverse">Hello</Text>
      </Box>
      <DensityProvider size="small">
        <Box
          padding={4}
          height="100%"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="education"
        >
          <Text color="inverse">Hello</Text>
        </Box>
      </DensityProvider>
      <DensityProvider size="large">
        <Box
          padding={4}
          height="100%"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="education"
        >
          <Text color="inverse">Hello</Text>
        </Box>
      </DensityProvider>
    </Flex>
  );
}
