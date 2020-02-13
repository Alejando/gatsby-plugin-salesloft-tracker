import React from 'react'
import {
  Container,
  Col,
  Row,
  Button
} from 'reactstrap';
import Banner from '../components/banner'
import Layout from '../components/layout'
import {
  graphql,
  Link
 } from 'gatsby';
import * as R from 'ramda'

import bannerImage from '../images/work_densitylabs.png'
import Characteristic from '../components/characteristic'

const nodeCharacteristicMapper = ({
  frontmatter: {
    order,
    title,
    titleColor,
    bgColor,
    textColor,
  },
  html,
}) => ({
  order,
  title,
  titleColor,
  bgColor,
  textColor,
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
            <Row className="mb-4">
              {
                dataToCharacteristics(data).map(characteristic => (
                  <Characteristic
                    key = { characteristic.order }
                    title = { characteristic.title }
                    titleColor = { characteristic.titleColor }
                    bgColor = { characteristic.bgColor }
                    textColor = { characteristic.textColor }
                    descriptionHtml = { characteristic.descriptionHtml }
                  />
                ))
              }
            </Row>
          </Col>
          <Col className="mb-5 text-center">
            <h3 >Tell us about your project needs. We’re here to make you happy!</h3>
            <div className="my-3">
              <Link to="/contact-us">
                <Button color="danger">Contact Us</Button>
              </Link>
            </div>
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
            titleColor
            bgColor
            textColor
          }
          html
        }
      }
    }
  }
`

export default WhyUs
