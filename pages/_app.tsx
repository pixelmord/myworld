/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';

import App from 'next/app';
import { TinaCMS, TinaProvider } from 'tinacms';
import { ThemeProvider } from 'theme-ui';
import { GithubClient, TinacmsGithubProvider } from 'react-tinacms-github';

import { myWorldTheme } from '../styles';
export default class Site extends App {
  cms: TinaCMS;

  constructor(props) {
    super(props);
    /**
     * 1. Create the TinaCMS instance
     */
    this.cms = new TinaCMS({
      enabled: !!props.pageProps.preview,
      apis: {
        /**
         * 2. Register the GithubClient
         */
        github: new GithubClient({
          proxy: '/api/proxy-github',
          authCallbackRoute: '/api/create-github-access-token',
          clientId: process.env.GITHUB_CLIENT_ID,
          baseRepoFullName: process.env.REPO_FULL_NAME,
        }),
      },
      /**
       * 3. Hide the Sidebar & Toolbar
       *    unless we're in Preview/Edit Mode
       */
      sidebar: props.pageProps.preview,
      toolbar: props.pageProps.preview,
    });
  }

  render(): React.ReactElement {
    const { Component, pageProps } = this.props;
    return (
      /**
       * 4. Wrap the page Component with the Tina and Github providers
       */
      <ThemeProvider theme={myWorldTheme}>
        <TinaProvider cms={this.cms}>
          <TinacmsGithubProvider onLogin={onLogin} onLogout={onLogout} error={pageProps.error}>
            <EditLink cms={this.cms} />
            <Component {...pageProps} />
          </TinacmsGithubProvider>
        </TinaProvider>
      </ThemeProvider>
    );
  }
}

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null;
  const headers = new Headers();

  if (token) {
    headers.append('Authorization', 'Bearer ' + token);
  }

  const resp = await fetch(`/api/preview`, { headers: headers });
  const data = await resp.json();

  if (resp.status == 200) window.location.href = window.location.pathname;
  else throw new Error(data.message);
};

const onLogout = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};

export interface EditLinkProps {
  cms: TinaCMS;
}

export const EditLink = ({ cms }: EditLinkProps) => {
  return <button onClick={() => cms.toggle()}>{cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}</button>;
};
