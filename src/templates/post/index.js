import React from "react"
import {Link} from 'gatsby'
import {MDXProvider} from '@mdx-js/react'

export default function PostTemplate({pageContext,children}) {
  const {tagList,name, frontmatter} = pageContext
  const title = frontmatter.title === "" ? name : frontmatter.title
  return (
    <>
      <h1>{title}</h1>
      {tagList.map(tag =>
        <Link to={`/tag/${tag}`} style={{marginRight:"10px"}}>#{tag}</Link>
      )}
      <MDXProvider>
      {children}
    </MDXProvider>
    </>
  )
}
