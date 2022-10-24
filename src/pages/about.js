import * as React from 'react';
import { Link } from 'gatsby';
import { Seo } from '../components/seo.js';
import Layout from '../components/layout.js';

export default function AboutPage() {
  return (
    <Layout
      title="About this site"
      description="More information about this site"
    >
      <h1>About this site</h1>
    </Layout>
  );
}
