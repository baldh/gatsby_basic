module.exports = {
  siteMetadata: {
    siteUrl: "https://yourdomain.tld",
    title: "Basic Gatsby Starter",
    description: "Basic Gatsby example and setup",
    image: "https://source.unsplash.com/YFzPw-Ph1Hw"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`
      }
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/posts`
      }
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.mdx`, `.md`],
      }
    }
  ]
}