// @flow strict
import { type Node } from 'react';
import { Box, ComboBox, Flex, Heading } from 'gestalt';

export default function TextFieldSizes(): Node {
  const options = Array(20)
    .fill(0)
    .map((item, index) => ({
      label: `Label-${index + 1}`,
      value: `Value-${index + 1}`,
      subtext: `Subtext-${index + 1}`,
    }));

  return (
    <Box padding={8}>
      <Flex direction="column" gap={{ column: 6, row: 0 }}>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="300">sm</Heading>
          <ComboBox
            accessibilityClearButtonLabel="Clear the current value"
            label="Small Field"
            id="subtext"
            noResultText="No results for your selection"
            options={options}
            placeholder="Select a value"
            size="sm"
          />
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="300">md</Heading>
          <ComboBox
            accessibilityClearButtonLabel="Clear the current value"
            label="Medium Field"
            id="subtext"
            noResultText="No results for your selection"
            options={options}
            placeholder="Select a value"
            size="md"
          />
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="300">lg</Heading>
          <ComboBox
            accessibilityClearButtonLabel="Clear the current value"
            label="Large Field"
            id="subtext"
            noResultText="No results for your selection"
            options={options}
            placeholder="Select a value"
            size="lg"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
