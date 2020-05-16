import * as React from 'react';
import Head from 'next/head';

export default function Home(): React.ReactElement {
  return (
    <div className="container">
      <Head>
        <title>Pixelmord's world</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Welcome 😀</h1>
      </main>
    </div>
  );
}
