import React from 'react'
import {
  Container,
  Row,
  Col,
} from 'reactstrap'
import * as R from 'ramda'

import Layout from '../components/layout'
import Skill from '../components/skill/skill'

import { graphql } from 'gatsby';
import { css } from 'emotion'

const nodeSkillMapper = ({
  frontmatter: {
    name,
    icon,
    sub,
  },
  html,
}) => ({
  name,
  icon,
  sub,
  descriptionHtml: html,
})

const dataToSkills = R.pipe(
  R.view(R.lensPath(['skills', 'edges'])),
  R.map(R.pipe(R.prop('node'), nodeSkillMapper))
)

const dataToTechnologies = R.pipe(
  R.view(R.lensPath(['technologies', 'edges'])),
  R.map(R.view(R.lensPath(['node', 'publicURL'])))
)

const IndexPage = ({ data }) => (
  <>
    {/* <HeroCarousel /> */}
    <Layout>
      <Container>
        <h1 className="text-center pb-3 border-bottom mb-3">YOU'LL <strong>LOVE</strong> WORKING WITH US</h1>
        <Row>
          {
            dataToSkills(data).map(skill => (
              <Col md="12" lg="4" key={skill.name}>
                <Skill
                  icon={skill.icon}
                  title={skill.name}
                  subTitle={skill.sub}
                  descriptionHtml={skill.descriptionHtml}
                />
              </Col>
            ))
          }
        </Row>
        <h1 className="pb-3 mb-3 border-bottom">Our <strong>Technologies</strong></h1>
        <Row>
          {
            dataToTechnologies(data).map(src => (
              <Col sm={2}>
                <img key={src} src={src} alt={src} />
              </Col>
            ))
          }

        </Row>
      </Container>
      <div className="text-white bg-danger mt-4 p-5 text-center">
          <p
            css={css`
              font-size: 2rem;
            `}
          >
            Get in touch with us today.<br/>We'd love to make you a happy customer!
          </p>
      </div>
    </Layout>
  </>
)

export const pageQuery = graphql`
  query IndexQuery {
    skills: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/(skills)/.*.md$/"}},
      sort: { fields: frontmatter___name  }
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            sub
            icon
          }
          html
        }
      }
    }
    technologies: allFile(
      filter: { relativeDirectory: { eq: "technologies" } }
    ) {
      edges {
        node {
          publicURL
        }
      }
    }
  }
`

export default IndexPage
