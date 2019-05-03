import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Container } from 'reactstrap'
import { css } from '@emotion/core'
import Banner from '../components/banner';

const GenericPage = ({ data }) => {
  const page = data.markdownRemark

  const siteMeta = {
    path: `/${page.frontmatter.slug}`,
    subtitle: page.frontmatter.name,
    openGraphTitle: `DensityLabs | ${page.frontmatter.name}`,
    description: page.excerpt,
    type: 'Page'
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
    }
    excerpt(pruneLength: 140)
    html
  }
}
`

export default GenericPage;
