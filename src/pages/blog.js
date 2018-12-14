import React from 'react'
import {
  Container,
} from 'reactstrap';
import Layout from '../components/layout'
import { css } from "@emotion/core"
import PostItem from '../components/post/post-item';

const dataToPosts = data => {
  const edges = data.allMarkdownRemark.edges;
  return edges.map(edge => {
    return {
      id: edge.node.id,
      name: edge.node.frontmatter.name,
      date: edge.node.frontmatter.date,
      imageSrc: edge.node.frontmatter.image.childImageSharp.original.src,
      tags: edge.node.frontmatter.tags,
      author: edge.node.frontmatter.author,
      summaryHtml: edge.node.excerpt,
    }
  });
};

const Blog = ({ data }) => {
  const posts = dataToPosts(data)

  return (
    <Layout>
      <Container className="py-5">
        <h1
          className="border-bottom pb-3"
          css={css`color: #333333;`}
        >
          BLOG POSTS
          </h1>
        {
        posts.map((post, i) => (
          <PostItem post={post} key={i}/>
        ))
      }
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/(posts)/.*.md$/"}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            date
            image{
              childImageSharp {
                original {
                  src
                }
              }
            }
            tags
            author
          }
          excerpt(pruneLength:250,format:HTML)
        }
      }
    }
  }
`

export default Blog
