/*
pages/[id].tsx renders a dynamic gestalt docs page with a with a page that isn't defined .

The getStaticPaths() will look at the files in the ./markdown folder and try to render a page if it exists, or returns a 404.

We do this so we don't have to define each page, and can just define the pages in the markdown folder.
*/

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import ErrorBoundary from '../docs-components/ErrorBoundary';
import MarkdownPage from '../docs-components/MarkdownPage';
import { getAllMarkdownPosts, getDocByRoute } from '../utils/mdHelper';

function getPlatform(pathName: string): 'android' | 'ios' | 'web' {
  if (pathName.startsWith('android')) return 'android';
  if (pathName.startsWith('ios')) return 'ios';
  return 'web';
}

type MDXRemoteSerializeResult = {
  compiledSource: string;
  frontmatter?: {
    [key: string]: string;
  };
};

type Props = {
  content: MDXRemoteSerializeResult;
  meta: {
    title: string;
    badge: 'pilot' | 'deprecated';
    fullwidth?: boolean;
    description: string;
    component: boolean;
  };
  pageSourceUrl: string;
  platform: 'android' | 'ios' | 'web';
};

export default function DocumentPage({ content, meta, pageSourceUrl, platform }: Props) {
  return (
    <ErrorBoundary>
      <MarkdownPage meta={meta} pageSourceUrl={pageSourceUrl} platform={platform}>
        <MDXRemote {...content} />
      </MarkdownPage>
    </ErrorBoundary>
  );
}

export async function getStaticProps(context: {
  params: {
    id: ReadonlyArray<string>;
  };
}): Promise<{
  props: {
    meta: {
      [key: string]: string;
    };
    content: Record<any, any>;
    pageSourceUrl: string;
    platform: 'android' | 'ios' | 'web';
  };
}> {
  const { id } = context.params;

  const pathName = id.join('/');
  const { meta, content } = await getDocByRoute(pathName);

  // @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  const mdxSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGfm, remarkBreaks], format: 'mdx' },
  });

  return {
    props: {
      meta,
      content: mdxSource,
      pageSourceUrl: `https://github.com/pinterest/gestalt/tree/master/docs/markdown/${pathName}.md`,
      platform: getPlatform(pathName),
    },
  };
}

export async function getStaticPaths(): Promise<{
  paths: ReadonlyArray<{
    params: {
      id: string | ReadonlyArray<string>;
    };
  }>;
  fallback: boolean;
}> {
  // get all the possible paths that exist within ./markdown folder
  const paths = await getAllMarkdownPosts();

  return {
    paths: paths.map((name) => ({
      params: {
        id: name,
      },
    })),

    fallback: false, // show 404 if not a valid path }
  };
}
