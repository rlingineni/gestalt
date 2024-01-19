// @flow strict
import { type Element, type Node as ReactNode } from 'react';
import { Badge, Box, Flex, Heading, Link, SlimBanner, Text } from 'gestalt';
import * as gestaltChart from 'gestalt-charts'; // eslint-disable-line import/no-namespace
import * as gestaltDatepicker from 'gestalt-datepicker'; // eslint-disable-line import/no-namespace
import trackButtonClick from './buttons/trackButtonClick';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import componentData from './data/components';
import getByPlatform from './data/utils/getByPlatform';
import InternalOnlyIconButton from './InternalOnlyIconButton';
import Markdown from './Markdown';
import PageHeaderQualitySummary from './PageHeaderQualitySummary';
import { SlimBannerExperiment } from './SlimBannerExperiment';

const webComponentData = getByPlatform(componentData, { platform: 'web' });

const gestaltChartComponents = Object.keys(gestaltChart);
const gestaltDatepickerComponents = Object.keys(gestaltDatepicker);

const buildSourceLinkPath = (componentName: string) => {
  let packageName = 'gestalt';

  if (gestaltChartComponents.includes(componentName)) {
    packageName = 'gestalt-charts';
  }

  if (gestaltDatepickerComponents.includes(componentName)) {
    packageName = 'gestalt-datepicker';
  }
  return `packages/${packageName}/src/${componentName}.js`;
};

const buildSourceLinkUrl = (componentName: string) =>
  ['https://github.com/pinterest/gestalt/blob/master', buildSourceLinkPath(componentName)].join(
    '/',
  );

type Props = {
  badge?:
    | 'pilot'
    | 'deprecated'
    | 'experimental'
    | 'comparison'
    | 'comparisontrends'
    | 'connection'
    | 'partstowhole'
    | 'trends',
  children?: ReactNode,
  description?: string,
  /**
   * Only use if name !== file name
   */
  fileName?: string,
  /**
   * Only use if name !== file name and the link should point to a directory
   */
  folderName?: string,
  margin?: 'default' | 'none',
  name: string,
  slimBanner?: Element<typeof SlimBanner> | null,
  slimBannerExperiment?: Element<typeof SlimBannerExperiment> | null,
  type?: 'guidelines' | 'component' | 'utility',
  pdocsLink?: boolean,
};

export default function PageHeader({
  badge,
  children,
  description = '',
  fileName,
  folderName,
  pdocsLink = false,
  margin = 'default',
  name,
  slimBanner = null,
  slimBannerExperiment = null,
  type = 'component',
}: Props): ReactNode {
  const sourcePathName = folderName ?? fileName ?? name;
  let sourceLink = buildSourceLinkUrl(sourcePathName);
  if (folderName) {
    // Strip the file extension if linking to a folder
    sourceLink = sourceLink.replace(/\.js$/, '');
  }

  const { alias } = webComponentData.find((component) => component.name === name) ?? {};

  const badgeMap = {
    pilot: {
      text: 'Pilot',
      tooltipText: `This is the initial version of ${name}, and additional (non-breaking) functionality is planned for the future. Any feedback is greatly appreciated!`,
    },
    experimental: {
      text: 'Experimental',
      tooltipText: `This is an experimental version of ${name}. This component might significantly change in the future with additional breaking functionality. The component could be deprecated as well. We recommend not using it unless discuss and agreed with the Gestalt team.`,
    },
    deprecated: {
      text: 'Deprecated',
      tooltipText: `This component is deprecated and will be removed soon.`,
      type: 'error',
    },
    comparison: {
      text: 'Comparison',
      tooltipText: 'Charts used to see how multiple data sets compare to each other.',
    },
    comparisontrends: {
      text: 'Comparison + Trends',
      tooltipText: 'Charts used to both see a trend over time and compare amounts in a category.',
    },
    connection: {
      text: 'Connection',
      tooltipText: 'Charts used to see the relationship between variables.',
    },
    partstowhole: {
      text: 'Parts-to-whole',
      tooltipText: 'Charts used to see how a breakdown adds up to a total.',
    },
    trends: {
      text: 'Trends',
      tooltipText: 'Charts used to see how data changes over time.',
    },
  };

  const showMargin = margin === 'default';
  const addGap = Boolean(children);

  return (
    <Box
      marginBottom={addGap || !showMargin ? 0 : 2}
      dangerouslySetInlineStyle={{
        __style: {
          paddingBottom: '1px',
        },
      }}
    >
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: addGap ? 8 : 0,
        }}
      >
        <Flex direction="column" gap={3}>
          <Flex justifyContent="between" wrap>
            <Heading>
              {name}{' '}
              {badge ? (
                <Badge
                  tooltip={{ text: badgeMap[badge].tooltipText }}
                  text={badgeMap[badge].text}
                  position="top"
                  type={badgeMap[badge].type || 'info'}
                />
              ) : null}
            </Heading>

            {/* Enable this when we have a consistent directory structure */}
            {['component' /* 'utility' */].includes(type) && (
              <Flex direction="column" gap={1}>
                <Text>
                  <Link
                    href={sourceLink}
                    onClick={() => trackButtonClick('View source on GitHub', sourcePathName)}
                    target="blank"
                    underline="always"
                  >
                    View source on GitHub
                  </Link>
                </Text>
                <Text>
                  <Link
                    href={`https://github.com/pinterest/gestalt/releases?q=${name
                      // Remove spaces and dashes
                      .replaceAll(/[\s-]/g, '')}${alias ? ' OR ' : ''}${
                      alias ? alias.join(' OR ') : ''
                    }&expanded=true`}
                    onClick={() =>
                      trackButtonClick('View recent changes on GitHub', sourcePathName)
                    }
                    target="blank"
                    underline="always"
                  >
                    See recent changes on GitHub
                  </Link>
                </Text>
                {pdocsLink ? (
                  <Flex alignItems="center" gap={1}>
                    <Text>
                      <Link
                        href="#Internal-documentation"
                        onClick={() =>
                          trackButtonClick('Consult PDocs for this component', sourcePathName)
                        }
                        underline="always"
                      >
                        Consult PDocs for this component
                      </Link>
                    </Text>
                    <InternalOnlyIconButton />
                  </Flex>
                ) : null}
              </Flex>
            )}
          </Flex>

          <Flex direction="column" gap={6}>
            <Flex direction="column" gap={1} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
              {description && <Markdown text={description} />}
              {alias && alias.length > 0 && (
                // using h2 to indicate to Algolia search that this is important, but don't want native browser styling
                <h2 className="reset">
                  <Text italic>also known as {alias.join(', ')}</Text>
                </h2>
              )}
            </Flex>

            <Flex direction="column" gap={4}>
              {slimBanner}
              {slimBannerExperiment}
            </Flex>

            {type === 'component' ? <PageHeaderQualitySummary name={name} /> : null}

            {children ? <Box marginTop={2}>{children}</Box> : null}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
