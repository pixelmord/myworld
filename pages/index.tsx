import * as React from 'react';
import Head from 'next/head';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubJsonForm } from 'react-tinacms-github';
import { GetStaticProps } from 'next';

export type HomeProps = {
  file: {
    data: {
      title: string;
      metaTitle: string;
    };
  };
};
export default function Home({ file }: HomeProps): React.ReactElement {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { name: 'title', component: 'text' },
      { name: 'metaTitle', component: 'text' },
    ],
  };
  const [data, form] = useGithubJsonForm(file as any, formOptions);
  return (
    <div className="container">
      <Head>
        <title>{data.metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{data.title}</h1>
      </main>
    </div>
  );
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({ preview, previewData }) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.en.json',
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.en.json')).default,
      },
    },
  };
};
