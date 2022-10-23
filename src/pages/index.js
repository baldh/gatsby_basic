import * as React from "react"
import {Link, useStaticQuery, graphql} from "gatsby"

export default function IndexPage() {
  const data = useStaticQuery(graphql`
      query MyQuery {
          site {
              siteMetadata {
                  title
              }
          }
      }
  `)

  const meta = data?.site?.siteMetadata ?? {}
  return (
    <>
      <header>
        <Link to={"/"}>{meta.title}</Link>
      </header>
      <main>
        <h1>Welcome to gatsby</h1>
        <Link to={"/about"}>Go yo about page</Link>
      </main>
    </>

  )
}