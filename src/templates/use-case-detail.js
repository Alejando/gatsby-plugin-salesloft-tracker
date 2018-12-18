import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col, Button } from 'reactstrap'
import ImageGallery from '../components/media/image-gallery';

const UseCaseDetail = ({ data }) => {
  const useCase = data.markdownRemark
  return (
    <Layout>
      <Container className="pt-4">
        <Row>
          <Col md="8">
            <h1 className="border-bottom pb-2 mb-3">{useCase.frontmatter.name}</h1>
            <div className="mb-4">
              <ImageGallery
                images={useCase.frontmatter.images.map(i => ({
                  src: i.childImageSharp.fluid.src,
                  alt: useCase.frontmatter.name
                }))}
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: useCase.html }} />
          </Col>
          <Col md="4">
            <aside>
              <h2 className="border-bottom pb-2">Project Info</h2>
              <dl>
                <dt>Client</dt>
                <dd>{useCase.frontmatter.name}</dd>
                <dt>In</dt>
                <dd>{useCase.frontmatter.technology}</dd>
                <dt>Place</dt>
                <dd>{useCase.frontmatter.place}</dd>
                <a
                  href={useCase.frontmatter.external_link}
                  target="_blank"
								  rel="noopener noreferrer"
                >
                  <Button color="primary">
                    External Link <FontAwesomeIcon className="ml-2" icon="external-link-alt" />
                  </Button>
                </a>
              </dl>
            </aside>
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
      technology
      place
      external_link
      images {
        childImageSharp {
          fluid {
            src
          }
        }
      }
      imageFooter
    }
    html
  }
}
`

export default UseCaseDetail;
