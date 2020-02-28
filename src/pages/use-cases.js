import React from 'react'
import {
  Container,
  Col,
  Row
} from 'reactstrap';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import UseCaseList from '../components/use-cases/use-case-list';
import ContactUsSection from '../components/use-cases/contact-us-section';
import Banner from '../components/banner'
import bannerImage from '../images/work_densitylabs.png'

const dataToUseCases = data => {
  const edges = data.allMarkdownRemark.edges;
  return edges.map(edge => {
    return {
      id: edge.node.id,
      name: edge.node.frontmatter.name,
      logo: edge.node.frontmatter.logo.childImageSharp.original.src,
      imageFooter: edge.node.frontmatter.imageFooter,
      descriptionHtml: edge.node.html,
    }
  });
};

const siteMeta = {
  subtitle: 'Use Cases',
  path: '/use-cases',
  openGraphTitle: 'Use Cases',
  keywords: 'densitylabs, density labs, our work, densitylabs our work, Modcloth, Headline Shirts ERP, Developed, Ruby on Rails, Our Experience, Developed in Ruby on Rails',
  description: 'This is the work we have done and the amazing people we had the privilege to work with.',
}

const Work = ({ data }) => {
  const useCaseList = dataToUseCases(data)

  return (
    <Layout siteMeta={siteMeta}>
      <Banner
        image={bannerImage}
        title="Use Cases"
        content="This is the work we have done and the amazing people we had the privilege to work with."
      />
      <Container className="pt-4">
        <Row>
          <Col md="12" className="mt-3">
            <div className="use-case-list">
            <UseCaseList list={useCaseList} />
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <ContactUsSection/>
        </Row>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//(cases)/.*.md$/"}}
      sort: { fields: frontmatter___order }
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            logo {
              childImageSharp {
                original {
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

export default Work