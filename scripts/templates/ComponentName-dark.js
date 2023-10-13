// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import ComponentNameSnapshot from './ComponentName.js';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <ComponentNameSnapshot />
    </ColorSchemeProvider>
  );
}
