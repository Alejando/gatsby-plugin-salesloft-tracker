/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const { slugify } = require('./src/lib/url-utils')

exports.createPages = ({ graphql, actions }) => {
  return Promise.all([
    createUseCasePages({graphql, actions}),
    createPostPages({graphql, actions}),
    createGenericPages({graphql, actions}),
  ])
}

const createUseCasePages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//(cases)/.*.md$/" } }
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


const createPostPages = async ({ graphql, actions })  => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "//(posts)/.+/.*.md$/"}}
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
      path: `blog/${slugify(node.frontmatter.name)}`,
      component: path.resolve(`./src/templates/post-detail.js`),
      context: {
        id: node.id,
      },
    })
  })
}

const createGenericPages = async ({ graphql, actions })  => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "//(pages)/.*.md$/"}}
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/generic-page.js`),
      context: {
        id: node.id,
      },
    })
  })
}
