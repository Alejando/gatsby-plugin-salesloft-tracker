import React from 'react'
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap'
import * as R from 'ramda'

import Layout from '../components/layout'
import Skill from '../components/skill/skill'
import Slider from '../components/sliders/home-slider'

import { graphql } from 'gatsby';
import { css } from 'emotion'
import { Link } from 'gatsby'

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

const siteMeta = {
  type: 'Home'
}

const Index = ({ data }) => (
  <>
    {/* <HeroCarousel /> */}
    <Layout siteMeta={siteMeta}>
      <Slider/>
      <Container>
        <h1 className="text-center pb-3 border-bottom mb-4 font-weight-light ">
          YOU'LL <strong className="font-weight-bold">LOVE</strong> WORKING WITH US
        </h1>
        <Row  className="my-5">
          {
            dataToSkills(data).map(skill => (
              <Col md="12" lg="4" key={skill.name} className="mb-4">
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
        <h2 className="text-center py-4  border-top font-weight-light ">
          Our <strong className="font-weight-bold">Technologies</strong>
        </h2>
        <Row className="border-top py-4" >
          {
            dataToTechnologies(data).map(src => (
              <Col md={2} xs={4} key={src}>
                <img key={src} src={src} alt={src} />
              </Col>
            ))
          }

        </Row>
      </Container>
      <div className="text-white mt-4 p-5 text-center" css={css`background-color: #ED1C24;`}>
          <h1 className="text-white font-weight-bold mb-4">Ready to get started?</h1>
          <h3>
            Get in touch with us today.<br/>We'd love to make you a happy customer!
          </h3>
          <Link to="/contact-us">
            <Button color="warning" size="lg">
              Contact us for a 30 minute free consultation
            </Button>
          </Link>
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

export default Index
