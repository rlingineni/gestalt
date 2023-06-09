// @flow strict
import { type Node } from 'react';
import { Box, Flex, TagData, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex gap={2}>
          <TagData text="CPM" showCheckbox dismissable />
          <TagData text="CPM" showCheckbox selected dismissable />
          <TagData
            baseColor="white"
            text="Impressions"
            showCheckbox
            selected
            dismissable
            color="03"
          />
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}