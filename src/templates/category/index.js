import React from "react"

export default function CategoryTemplate({pageContext}){
  const {categoryName:name,categoryPath:path,allPosts} = pageContext
  const regex = new RegExp('.*/'+path+'/.+')
  const posts = allPosts.filter(post => regex.test(post))

  return (
    <>
      <h1>{name}</h1>
      {posts.map(post => <p>{post}</p>)}
    </>
  )
}
