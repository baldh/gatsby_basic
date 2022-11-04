import React from "react"
import {Link} from 'gatsby'
import {MDXProvider} from '@mdx-js/react'

export default function BlogpostTemplate({pageContext,children}) {
  const {tagList} = pageContext
  return (
    <>
      {tagList.map(tag =>
        <Link to={`/tag/${tag}`} style={{marginRight:"10px"}}>#{tag}</Link>
      )}
      <MDXProvider>
      {children}
    </MDXProvider>
    </>
  )
}
