# DensityProvider

FOLLOW STEPS HERE
https://gestalt.pinterest.systems/get_started/developers/contributing/development_process#Create-a-pull-request

These are the remaining steps to configure your components:

- Add DensityProvider into docs/docs-components/siteIndex.js

- Replace DensityProvider.svg file SVG content in docs/graphics/general/DensityProvider.svg

- Import DensityProvider.svg in docs/docs-components/COMPONENT_DATA.js and paste data for component alphabetically

import DensityProvider from '../graphics/general/DensityProvider.svg';

{
svg: <DensityProvider />,
name: 'DensityProvider',
aliases: [],
previouslyNamed: [],
path: null,
hasDarkBackground: false,
description:
'DensityProvider is description',
category: 'PENDING',
status: {
accessible: {
summary: null,
a11yVisual: null,
a11yScreenreader: null,
a11yNavigation: null,
a11yComprehension: null,
},
badge: null,
android: 'notAvailable',
deprecated: false,
documentation: 'notAvailable',
iOS: 'notAvailable',
figma: 'notAvailable',
responsive: 'notAvailable',
},
android: {
accessible: {
summary: null,
a11yVisual: null,
a11yScreenreader: null,
a11yNavigation: null,
a11yComprehension: null,
},
badge: null,
deprecated: false,
documentation: 'notAvailable',
figma: null,
},
iOS: {
accessible: {
summary: null,
a11yVisual: null,
a11yScreenreader: null,
a11yNavigation: null,
a11yComprehension: null,
},
badge: null,
deprecated: false,
documentation: 'notAvailable',
figma: null,
},
},

Before merging

## Update Flow CSS coverage

yarn run flow-generate:css

## Update the TypeScript declaration files

`packages/gestalt/dist/index.d.ts`

Add:

/\*\*

- https://gestalt.pinterest.systems/web/densityprovider
  \*/
  export interface DensityProviderProps {
  prop: value;
  prop: value;
  prop: value;
  }

export const DensityProvider: React.FunctionComponent<DensityProviderProps>;

## Update all Gestalt packages builds running rollup

yarn build

## Update a specific visual test snapshots with the latest builds

yarn playwright:update-visual-test playwright/visual-test/DensityProvider --update-snapshots

## Add new component name to PR Title Checker

`.github/pr-title-checker-config.json`
Add your new component name to the regex (alphabetize please!). If you're renaming, replacing, or removing a component, — _and the component also doesn't exist on any other platforms_ — remove that component name from the regex.