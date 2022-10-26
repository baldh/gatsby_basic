import * as React from 'react';
import Layout from '../components/layout.js';
import {Seo} from '../components/seo'

export default function AboutPage() {
  return (
    <>
      <Seo title={"About this page"} description={"More information about this site"}/>
      <h1>About this site</h1>
    </>
  );
}
