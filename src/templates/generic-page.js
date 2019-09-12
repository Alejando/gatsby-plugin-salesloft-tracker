import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Container, Button } from 'reactstrap'
import { css } from '@emotion/core'
import Banner from '../components/banner';

const GenericPage = ({ data }) => {
  const page = data.markdownRemark

  const siteMeta = {
    path: `/${page.frontmatter.slug}`,
    subtitle: page.frontmatter.name,
    openGraphTitle: `DensityLabs | ${page.frontmatter.name}`,
    description: page.excerpt,
    type: 'website'
  }
  return (
    <Layout siteMeta={siteMeta}>
      {
        page.frontmatter.bannerDescription &&
        <Banner
          title={page.frontmatter.name}
          content={page.frontmatter.bannerDescription}
        />
      }
      <Container className="pt-4">
        <div
          dangerouslySetInnerHTML={{ __html: page.html }}
          css={css`
            h1, h2, h3, h4, h5 { color: black; }
            a { color: red;  }
          `}
        />
        <div className="d-flex justify-content-center py-5">
          <Button 
            color={page.frontmatter.buttonType}  
            href={page.buttonLink}
          >
            {page.frontmatter.buttonName}
          </Button>
        </div>
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
      slug
      name
      bannerDescription
      buttonName
      buttonLink
      buttonType
    }
    excerpt(pruneLength: 140)
    html
  }
}
`

export default GenericPage;
