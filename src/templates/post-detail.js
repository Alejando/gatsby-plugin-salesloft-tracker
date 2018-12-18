import React from 'react'
import {
  graphql,
  Link } from 'gatsby'
import Layout from '../components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col } from 'reactstrap'
import { css } from '@emotion/core'

const PostDetail = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Container className="pt-4">
        <Row>
          <Col md="12">
            <h1 className="pb-2 mb-3">{post.frontmatter.name}</h1>
            <div
              className="my-3"
              css={css`font-size: 12px; color: #aaa;`}
            >
              <span className="mr-3">
                <FontAwesomeIcon icon={["fas", "calendar-alt"]}  />
                <span className="ml-2">{ post.frontmatter.date } </span>
              </span>
              <span>
                <FontAwesomeIcon icon={["fas", "user"]}  />
                <span className="ml-2"> By { post.frontmatter.author }
                </span>
              </span>
            </div>
          </Col>
          <Col md="12 border-bottom">
            <img alt={post.name} src={post.frontmatter.image.childImageSharp.original.src} className="img-fluid  mb-4" />
            <div
              dangerouslySetInnerHTML={{ __html: post.html }}
              css={css`
                p{ color: #aaa; }
                a{ color: red;  }
              `}
            />
          </Col>
          <Col
            className="d-flex justify-content-between mt-2 mb-5"
            css={css`
              font-size: 12px;
              color: #aaa;
            `}
          >
            <span >
              <FontAwesomeIcon icon={["fas", "tags"]}  />
              {
              post.frontmatter.tags.map((tag, i) =>(
                <span key={i} className="mx-1">
                <Link to="blog" className="text-danger">
                  {tag}
                </Link>
                </span>
              ))
              }
            </span>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const query = graphql`
query($id: String!) {
  markdownRemark(
    id: { eq: $id }
  ) {
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
    html
  }
}
`

export default PostDetail;
