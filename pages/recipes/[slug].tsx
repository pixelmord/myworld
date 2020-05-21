import * as React from 'react';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { InlineWysiwyg, InlineTextareaField } from 'react-tinacms-inline';
import Head from 'next/head';
import fg from 'fast-glob';
import { useGithubMarkdownForm } from 'react-tinacms-github';

import { getMarkdownProps } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import Layout from '../../components/Layout';
import { RecipeFrontmatter } from '../../lib/contentTypes';
import { MarkdownPageProps } from '../../lib/propTypes';
import OpenAuthoringInlineForm from '../../components/OpenAuthoringInlineForm';
import { GithubPreviewProps } from 'next-tinacms-github';

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
  const [data, form] = useGithubMarkdownForm(file as any, formConfig);

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

            <InlineTextareaField name="frontmatter.title" />
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
}): Promise<
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
      const parts = recipe.split('/');
      return {
        params: {
          slug: parts[parts.length - 1].split('.').slice(0, -1).join('.'),
        },
      };
    }),
    fallback: false,
  };
};
