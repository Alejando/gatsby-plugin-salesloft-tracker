import React from 'react'
import { graphql, withPrefix, Link } from 'gatsby'
import Layout from '../components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col, Button } from 'reactstrap'
import ImageGallery from '../components/media/image-gallery';
import { slugify } from '../lib/url-utils';
import { css } from 'emotion'

const UseCaseDetail = ({ data }) => {
  const useCase = data.markdownRemark

  const siteMeta = {
    path: `/use-cases/${slugify(useCase.frontmatter.name)}`,
    subtitle: useCase.frontmatter.name,
    openGraphTitle: useCase.frontmatter.name,
    keywords: `${useCase.frontmatter.name}, our work, work, densitylabs, developed in Ruby on Rails, densitylabs, density labs, densitylabs our work, Our Experience`,
    description: useCase.frontmatter.description || useCase.excerpt,
    image: withPrefix(useCase.frontmatter.logo.childImageSharp.original.src),
    type: 'article'
  }
  return (
    <Layout siteMeta={siteMeta}>
      <Container className="pt-4">
        <Row className="pb-5">
          <Col md="8">
            <h1 className="border-bottom pb-2 mb-3">{useCase.frontmatter.name}</h1>
            <div className="mb-4">
              {
                useCase.frontmatter.images ?
                <ImageGallery
                  images={useCase.frontmatter.images.map(i => ({
                    src: i.childImageSharp.original.src,
                    alt: useCase.frontmatter.name
                  }))}
                /> :
                <div className="d-flex justify-content-center align-items-center py-5">
                  <img
                    src={useCase.frontmatter.logo.childImageSharp.original.src}
                    alt={useCase.frontmatter.name}
                    />
                </div>
              }
            </div>
            <div dangerouslySetInnerHTML={{ __html: useCase.html }} />
            <div>
            <Link to='/use-cases' >
                <Button color="secondary" className="mt-4">
                  <FontAwesomeIcon className="mr-2" icon="arrow-left"/>
                  Back
                </Button>
              </Link>
            </div>
          </Col>
          <Col md="4">
            <aside>
              <h2 className="border-bottom" css={css`padding-bottom:18px;`}>
                Project Info
              </h2>
              <dl>
                <dt>Client</dt>
                <dd>{useCase.frontmatter.name}</dd>
                <dt>In</dt>
                <dd>{useCase.frontmatter.technology}</dd>
                <dt>Place</dt>
                <dd>{useCase.frontmatter.place}</dd>
              </dl>
              {
                useCase.frontmatter.external_link &&
                <a
                href={useCase.frontmatter.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-danger text-white"
              >
                External Link <FontAwesomeIcon className="ml-2" icon="external-link-alt" />
              </a>
              }
            </aside>
          </Col>
          <Col>
          
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
      description
      logo {
        childImageSharp {
          original {
            src
          }
        }
      }
      images {
        childImageSharp {
          original {
            src
          }
        }
      }
      imageFooter
    }
    excerpt(pruneLength: 140)
    html
  }
}
`

export default UseCaseDetail;
