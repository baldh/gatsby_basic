import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Seo } from '../components/seo.js';

export default function IndexPage() {
  const data = useStaticQuery(graphql`
    query GetSiteTitle {
      site {
        siteMetadata {
          title
          image
        }
      }
    }
  `);

  const meta = data?.site?.siteMetadata ?? {};

  return (
    <>
      <Seo />
      <header>
        <Link to={'/'}>{meta.title}</Link>
      </header>
      <main>
        <h1>Welcome to gatsby</h1>
        <Link to={'/about'}>Go yo about page</Link>
      </main>
    </>
  );
}
