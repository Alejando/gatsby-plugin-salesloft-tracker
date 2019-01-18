import React from 'react'
import {
  Container,
} from 'reactstrap';
import Layout from '../components/layout'
import { graphql } from 'gatsby';
import PostItem from '../components/post/post-item';
import { withPrefix } from 'gatsby';

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

const siteMeta = {
  path: '/blog',
  openGraphTitle: 'Densitylabs Blog Posts',
  keywords: 'densitylabs, densitylabs Software Development Company, density labs, blogging, densitylabs blog post, ruby on rails development, software development for startups',
  description: 'Density Labs shares with you the technicals knowledge, experiences and the latest news.',
  image: withPrefix('/images/software-density-labs.jpg'),
  type: 'Blog'
}

const Blog = ({ data }) => {
  const posts = dataToPosts(data)

  return (
    <Layout siteMeta={siteMeta}>
      <Container className="py-5">
        <h1
          className="border-bottom pb-3"
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
