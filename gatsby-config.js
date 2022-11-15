const wrapESMPlugin = name =>
  function wrapESM(opts) {
    return async (...args) => {
      const mod = await import(name)
      const plugin = mod.default(opts)
      return plugin(...args)
    }
  }

module.exports = {
  siteMetadata: {
    siteUrl: "https://yourdomain.tld",
    title: "Basic Gatsby Starter",
    description: "Basic Gatsby example and setup",
    image: "https://source.unsplash.com/YFzPw-Ph1Hw"
  },
  plugins: [
    "gatsby-plugin-react-helmet",

    //This set of plugins is to enable creating MDX blog posts from src/posts folder
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/posts`
      }
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.mdx`, `.md`],
        mdxOptions: {
          rehypePlugins: [wrapESMPlugin('rehype-slug')],
        },
      }
    },

    //end of MDX config
  ]
}