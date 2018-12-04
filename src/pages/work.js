import React from 'react'
import {
  Container,
  Col,
  Row,
} from 'reactstrap';
import Layout from '../components/layout'
import { graphql } from 'gatsby';
import UseCaseList from '../components/use-cases/use-case-list';

const dataToUseCases = data => {
  const edges = data.allMarkdownRemark.edges;
  return edges.map(edge => {
    return {
      name: edge.node.frontmatter.name,
      imageSrc: edge.node.frontmatter.image.childImageSharp.fixed.src,
      imageFooter: edge.node.frontmatter.imageFooter,
      descriptionHtml: edge.node.html,
    }
  });
};

const WhoWeArePage = ({ data }) => {
  const useCaseList = dataToUseCases(data)

  return (
    <Layout>
      <Container className="pt-4">
        <h1 className="border-bottom pb-3">USE CASES</h1>
        <p className="lead text-muted">We are a full stack software engineering services company specializing in rapid development of mobile, web, SaaS and enterprise applications. </p>
        <Row>
          <Col md="12" className="mt-3">
            <div className="use-case-list">
            <UseCaseList list={useCaseList} />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/(cases)/.*.md$/"}}
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            image {
              childImageSharp {
                fixed {
                  src
                }
              }
            }
            imageFooter
          }
          html
        }
      }
    }
  }
`

export default WhoWeArePage
