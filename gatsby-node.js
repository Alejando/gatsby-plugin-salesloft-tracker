/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
require ('babel-polyfill')

const path = require('path')
const { slugify } = require('./src/lib/url-utils')
const { _ } = require('lodash')

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  actions: { replaceWebpackConfig }
}) => {
  switch (stage) {
    case 'build-javascript':
      // We want to include the babel polyfills before any application code,
      // so we're inserting it as an additional entry point.  Gatsby does not allow
      // this in "setWebpackConfig", so we have to use "replaceWebpackConfig"
      const config = getConfig();

      const app =
        typeof config.entry.app === 'string'
          ? [config.entry.app]
          : config.entry.app;

      config.entry.app = ['@babel/polyfill', ...app];
      replaceWebpackConfig(config);
  }
};

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
              tags
              author
            }
          }
        }
      }
    }
  `)

  posts = result.data.allMarkdownRemark.edges

  let tags = []
  let authors = []
  
  _.each(posts, edge => {
    createPage({
      path: `blog/${slugify(edge.node.frontmatter.name)}`,
      component: path.resolve(`./src/templates/post-detail.js`),
      context: {
        id: edge.node.id,
      },
    })
    if (_.get(edge, 'node.frontmatter.tags')) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
    if (_.get(edge, 'node.frontmatter.author')) {
      authors = authors.concat(edge.node.frontmatter.author)
    }
  })
  
  tags = _.uniq(tags)
  authors = _.uniq(authors)

  tags.forEach(tag => {
    createPage({
      path: `blog/tags/${slugify(tag)}`,
      component: path.resolve(`./src/templates/blog-tags.js`),
      context: {
        tag
      },
    })
  })

  authors.forEach(author => {
    createPage({
      path: `blog/author/${slugify(author)}`,
      component: path.resolve(`./src/templates/blog-author.js`),
      context: {
        author
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