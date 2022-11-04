import React from "react"

export default function TagTemplate({pageContext}){
  const {posts} = pageContext
  return (
    <>
      {posts.map(post => (
        <div>{post.path}</div>
      ))}
    </>
  )
}