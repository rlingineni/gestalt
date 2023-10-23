// @flow strict
import { type Context, createContext, type Element, type Node, useContext } from 'react';

type DensityContext = {
  size: 'small' | 'medium' | 'large',
};

type Props = {
  /**
   * The default size of density components
   */
  size: 'small' | 'medium' | 'large',
  /**
   * The underlying elemnets to change density on
   */
  children: Node,
};

const DensityContextDefault: Context<DensityContext> = createContext<DensityContext>({
  size: 'medium',
});

const { Provider } = DensityContextDefault;

/**
 * [DensityProvier](https://gestalt.pinterest.systems/web/utilities/DensityProvider) is an optional [React context provider](https://reactjs.org/docs/context.html#contextprovider) to globally set density.
 */
export default function DensityProvider({ size, children }: Props): Element<typeof Provider> {
  return <Provider value={{ size }}>{children}</Provider>;
}

function useDensityContext(): DensityContext {
  const { size } = useContext(DensityContextDefault);
  return { size };
}
export { useDensityContext };
