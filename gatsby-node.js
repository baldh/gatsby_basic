const {createSlug, createTagList} = require("./src/utils/functions/gatsby-node-helper")

exports.createPages = async ({graphql, actions, reporter}) => {
  const {createPage} = actions

  const result = await graphql(`
    query {
      allFile(filter: {ext: {eq: ".mdx"}}) {
        nodes {
          childMdx {
            internal {
              contentFilePath
            }
            frontmatter {
              tags
            }
          }
          relativeDirectory
          name
         }
      }
      allDirectory {
        nodes {
          relativePath
          name
        }
      }
    }`)

  if (result.errors) {
    reporter.panicOnBuild(`Error loading data`, result.errors)
  }
  const {data} = result

  const posts = data.allFile.nodes
  const categories = data.allDirectory.nodes

  //a utility for storing paths to pages of every type
  const allPages = {posts: [], categories: [], tags: []}

  //a utility for creating pages for each tag
  const tagsMap = {}
  function fillTagsMap(tagList, path, id) {
    tagList.forEach(tag => {
      if (tagsMap.hasOwnProperty(`${tag}`)) {
        tagsMap[`${tag}`].push({path: path, id: id})
        return
      }
      tagsMap[`${tag}`] = [{path: path, id: id}]
    })
  }

  //We are looping over every MDX posts to create individual "post" pages
  posts.forEach(post => {
    const path = post.relativeDirectory ?
      `/${createSlug(post.relativeDirectory)}/${createSlug(post.name)}` :
      `/${createSlug(post.name)}`

    let tagList = createTagList(post.childMdx.frontmatter.tags)
    let id = post.id

    if (allPages.posts.includes(path)) return

    allPages.posts.push(path)
    fillTagsMap(tagList, path, id)
    createPage({
      path: path,
      component: `${require.resolve(
        `./src/templates/post`
      )}?__contentFilePath=${post.childMdx.internal.contentFilePath}`,
      context: {
        name: post.name,
        tagList: tagList,
      }
    })
  })

  //We are looping over every category to create individual "category" pages
  categories.forEach(category => {
    if (category.relativePath === "") return
    let path = createSlug(category.relativePath)

    if (allPages.categories.includes(path)) return

    allPages.categories.push(path)
    createPage({
      path: path,
      component: require.resolve(`./src/templates/category`),
      context: {
        categoryName: category.name,
        categoryPath: path,
        allPosts: allPages.posts
      }
    })
  })

  //We are looping over every tag to create individual "tag" pages
  const tagList = createTagList(posts.map(node => node.childMdx.frontmatter.tags))
  tagList.forEach(tag => {
    if(tag === "") return
    let path = `tag/${tag}`

    if(allPages.tags.includes(path)) return

    allPages.tags.push(path)
    createPage({
      path: path,
      component: require.resolve(`./src/templates/tag`),
      context: {
        posts: tagsMap[tag]
      }
    })
  })
}