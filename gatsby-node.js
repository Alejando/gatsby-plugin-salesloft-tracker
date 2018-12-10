/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const { slugify } = require('./src/lib/url-utils')

// You can delete this file if you're not using it
exports.createPages = ({ graphql, actions }) => {
  return createUseCasePages({ graphql, actions })
}

const createUseCasePages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(cases)/.*.md$/" } }
      ) {
        edges {
          node {
            id
            frontmatter {
              name
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `work/${slugify(node.frontmatter.name)}`,
      component: path.resolve(`./src/templates/use-case-detail.js`),
      context: {
        id: node.id,
      },
    })
  })
}
