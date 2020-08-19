/** @jsx jsx */
import { jsx } from 'theme-ui';
import Head from 'next/head';
import { usePlugin, Plugin } from 'tinacms';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github';
import { GetStaticProps } from 'next';

import { LandingPageSection, LandingPageSectionContent } from '~components/prestyled';
import { NextPageWithDataProps, PageData } from 'lib/contentTypes';

export default function Home({ file }: NextPageWithDataProps): React.ReactElement {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { name: 'title', component: 'text' },
      { name: 'metaTitle', component: 'text' },
    ],
  };
  const [data, form] = useGithubJsonForm(file, formOptions) as [PageData, Plugin];
  usePlugin(form);
  useGithubToolbarPlugins();
  return (
    <div className="container">
      <Head>
        <title>{data.metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LandingPageSection>
          <LandingPageSectionContent>
            <h1 className="title">{data.title}</h1>
          </LandingPageSectionContent>
        </LandingPageSection>
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
      fileRelativePath: 'content/pages/home.en.json',
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/pages/home.en.json',
        data: (await import('../content/pages/home.en.json')).default,
      },
    },
  };
};
