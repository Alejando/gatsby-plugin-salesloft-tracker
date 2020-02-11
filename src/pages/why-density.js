import React from 'react'
import {
  Container,
  Col,
  Row,
} from 'reactstrap';
import Banner from '../components/banner'
import Layout from '../components/layout'
import {
  graphql
 } from 'gatsby';
import * as R from 'ramda'

import bannerImage from '../images/work_densitylabs.png'
import Characteristic from '../components/characteristic'

const nodeCharacteristicMapper = ({
  frontmatter: {
    order,
    title,
    icon,
    circleBgColor,
  },
  html,
}) => ({
  order,
  title,
  icon,
  circleBgColor,
  descriptionHtml: html,
})

const dataToCharacteristics = R.pipe(
  R.view(R.lensPath(['characteristics', 'edges'])),
  R.map(R.pipe(R.prop('node'), nodeCharacteristicMapper))
)

const siteMeta = {
  subtitle: 'Why Density?',
  path: '/why-density',
  openGraphTitle: 'Why Density?'
}

const WhyUs = ({ data }) => (
  <Layout siteMeta={siteMeta}>
    <Banner 
      image={bannerImage} 
      title="Why Density?"
      content="Density Labs is a technology product development company specializing in rapid development of mobile, and web, SaaS, and enterprise software applications. "
      />
    <Container>
        <Row >
          <Col md="12" className="m-auto pt-5">
            <Row className="mb-5">
              {
                dataToCharacteristics(data).map(characteristic => (
                  <Characteristic
                    key = { characteristic.order }
                    title = { characteristic.title }
                    icon = { characteristic.icon }
                    circleBgColor = { characteristic.circleBgColor }
                    descriptionHtml = { characteristic.descriptionHtml }
                  />
                ))
              }
            </Row>
          </Col>
        </Row>
      </Container>
  </Layout>

)

export const pageQuery = graphql`
  query WhyUsQuery {
    characteristics: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//(characteristics)/.*.md$/"}}
      sort: { fields: frontmatter___order  }
    ) {
      edges {
        node {
          id
          frontmatter {
            order
            title
            icon
            circleBgColor
          }
          html
        }
      }
    }
  }
`

export default WhyUs
