// @flow strict
import { type Node } from 'react';
import InternalLabel from './InternalLabel.js';

type Props = {|
  /**
   * The content of the label, typically [Text](https://gestalt.pinterest.systems/text) or similar.
   */
  children?: Node,
  /**
   * Unique id of the element this label is describing.
   */
  htmlFor: string,
|};

/**
 * Use the [Label](https://gestalt.pinterest.systems/labels) component to connect a label with a form component in an accessible way.
 *
 * ![Label light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Label%20%230.png)
 * ![Label dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Label-dark%20%230.png)
 *
 */
export default function Label({ children, htmlFor }: Props): Node {
  return <InternalLabel htmlFor={htmlFor}>{children}</InternalLabel>;
}
