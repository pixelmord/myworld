/** @jsx jsx */
import { jsx } from 'theme-ui';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { Form, usePlugin } from 'tinacms';
import { InlineWysiwyg } from 'react-tinacms-editor';
import { InlineText } from 'react-tinacms-inline';
import Head from 'next/head';
import fg from 'fast-glob';
import { useGithubMarkdownForm } from 'react-tinacms-github';
import { GithubPreviewProps } from 'next-tinacms-github';
import { GitFile } from 'react-tinacms-github/dist/form/useGitFileSha';

import { getMarkdownProps } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import { RecipeFrontmatter } from '../../lib/contentTypes';
import { MarkdownPageProps, MarkdownFileData } from '../../lib/propTypes';
import Layout from '~components/Layout';
import OpenAuthoringInlineForm from '~components/OpenAuthoringInlineForm';
import MarkdownContent from '~components/MarkdownContent';
import { LandingPageSection, LandingPageSectionContent, Heading } from '~components/prestyled';
import { slugFromFilepath } from 'lib/slugHelpers';
export default function RecipePage({
  file,
  preview,
}: MarkdownPageProps<RecipeFrontmatter> | GithubPreviewProps<RecipeFrontmatter>['props']): React.ReactElement {
  const router = useRouter();
  if (!router.isFallback && !file) {
    return <ErrorPage statusCode={404} />;
  }

  const formConfig = {
    label: 'Recipe',
    fields: [
      {
        name: 'frontmatter.title',
        label: 'Recipe Title',
        component: 'text',
      },
      {
        name: 'markdownBody',
        label: 'Content',
        component: 'markdown',
      },
    ],
  };

  // Registers Tina Form
  const [data, form] = useGithubMarkdownForm(file as GitFile<RecipeFrontmatter>, formConfig) as [
    MarkdownFileData<RecipeFrontmatter>,
    Form
  ];
  usePlugin(form);

  const frontmatter = data.frontmatter;
  const markdownBody = data.markdownBody;

  return (
    <OpenAuthoringInlineForm form={form} path={file.fileRelativePath} preview={preview}>
      <Layout preview={preview}>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <Head>
              <title>
                {frontmatter.title} | {CMS_NAME}
              </title>
              <meta property="og:image" content={frontmatter.ogImage} />
            </Head>
            <LandingPageSection>
              <LandingPageSectionContent>
                <Heading as="h1">
                  <InlineText name="frontmatter.title" />
                </Heading>
                <InlineWysiwyg name="markdownBody" format="markdown">
                  <MarkdownContent escapeHtml={false} content={markdownBody} />
                </InlineWysiwyg>
              </LandingPageSectionContent>
            </LandingPageSection>
          </>
        )}
      </Layout>
    </OpenAuthoringInlineForm>
  );
}

export async function getStaticProps({
  preview,
  previewData,
  params,
}: GetStaticPropsContext<{ slug: string }>): Promise<
  | {
      props: MarkdownPageProps<RecipeFrontmatter>;
    }
  | GithubPreviewProps<RecipeFrontmatter>
> {
  const props = await getMarkdownProps<RecipeFrontmatter>('recipes', `${params.slug}.md`, preview, previewData);
  return props;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await fg(`./content/recipes/**/*.md`);
  return {
    paths: recipes.map((recipe) => {
      return {
        params: {
          slug: `recipes/${slugFromFilepath(recipe)}`,
        },
      };
    }),
    fallback: true,
  };
};
