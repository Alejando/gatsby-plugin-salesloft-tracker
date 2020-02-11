import React from 'react'
import {
  Container,
  Col,
  Row,
  Button,
} from 'reactstrap'
import * as R from 'ramda'

import Layout from '../components/layout'
import { graphql } from 'gatsby';
import { css } from 'emotion'
import { Link } from 'gatsby'
import Line from '../components/v2/line';

import bgBanner1 from '../images/main_banner.jpg'

const dataToTechnologies = R.pipe(
  R.view(R.lensPath(['technologies', 'edges'])),
  R.map(R.view(R.lensPath(['node', 'publicURL'])))
)

const siteMeta = {
  subtitle: 'Home',
  type: 'website'
}

const Index = ({ data }) => (
  <div>
    <Layout siteMeta={siteMeta}>
      <div css={css`
          background-image: linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ),url(${bgBanner1});
          background-position: center;
          background-size: cover;
          width: 100%;
          height: 350px;
          @media (min-width: 768px) {
            height: 400px;
          }
          @media (min-width: 992px) {
            height: 450px;
          }
          @media (min-width: 1440px) {
            height: 500px;
          }
        `}
      >
        <Container className="h-100">
          <Row className="h-100">
            <Col className="text-white h-100 d-flex align-items-center justify-content-start">
              <div>
                <h1 className="font-weight-bold">Accelerate Your Application</h1>
                <h1 className="font-weight-bold">Development with</h1>
                <h1 className="mb-2 font-weight-bold">Nearshore Software Services.</h1>
                <h4 className="font-weight-light d-inline-flex">
                  See Our Latest Blog on
                  <Link to="/blog/a-new-perspective-on-manpower">
                    <p className=" ml-2 text-white font-weight-bold" css={css`text-decoration: underline;`}>Why</p>
                  </Link>
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="justify-content-lg-end my-2 mt-4">
          {ourTechnologies(data)}
        </Row>
        <Line align="left"/>
        <Row className="my-2 justify-content-lg-end">
          {resourcesForHire()}
        </Row>
        {banner2()}
        <Row className="mt-5 mb-2">
          <Col md={12}>
            <h3 className="text-center my-3" 
              css={css`
                color:#dc3545; 
                & b { color: black; }
              `}
            >
              Communication <b className="px-2">|</b> 
              Culture <b className="px-2">|</b>
              Capabilities <b className="px-2">|</b> 
              Collaboration
            </h3>
          </Col>
        </Row>
        {/* <Row className="my-2">
          <Col md={12} lg={10}>
            <Line align="right"/>
          </Col>
          <Col lg={2} className="d-flex align-items-center justify-content-center">
            <Link to="/contact-us">
              <Button color="danger" size="lg" className="rounded-pill">
                Let's Talk!
              </Button>
            </Link>
          </Col>
        </Row> */}
        {/* <Row className="my-2">
          <Col xs={12} className="mt-2">
            <Line/>
          </Col>
        </Row> */}
        {/* <Row  className="my-5">
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
        </Row> */}
      </Container>

      <div className="text-white mt-4 p-5 text-center" css={css`background-color: #dc3545;`}>
          <h1 className="text-white font-weight-bold mb-4">Ready to get started?</h1>
          <h3>
            Get in touch with us today.<br/>We'd love to make you a happy customer!
          </h3>
          <Link to="/contact-us">
            <Button color="dark" size="lg">
              Contact us for a 30 minute free consultation
            </Button>
          </Link>
      </div>
    </Layout>
  </div>
)

export const pageQuery = graphql`
  query IndexQuery {
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

const resourcesForHire = () => (
  <Col  lg={10} 
    css={css`
      @media (min-width: 992px) {
        margin-top: -60px;
      }
    `}
  >
    <Row className="d-block d-sm-flex justify-content-center w-100 align-items-center text-center" 
      css={css`font-size:18px; color: gray;`}
    >
      <Col md={4} lg={"auto"} className="mr-3 mt-2 font-weight-bold ">Resources for Hire:</Col>
      <Col className="mt-2 p-lg-0" > Software Developers | QA & Automation | DevOps | Project Management | UX/UI Design</Col>
    </Row>
  </Col>
)

const ourTechnologies = (data) => (
  <Col 
    md={12}
    lg={10}
    css={css`
      @media (min-width: 992px) {
        margin-bottom: -60px;
      }
    `}
  >
    <Row>
      {
        dataToTechnologies(data).map(src => (
          <Col md={2} xs={4} key={src} className="my-3 d-flex align-items-center">
            <img key={src} src={src} alt={src} width="100%" />
          </Col>
        ))
      }
    </Row>
  </Col>
)

const banner2 = () => (
  <Row className="mb-4">
    <Col md={6} className="text-white py-4 mt-4 mr-md-4"
      css={css`
      background: #dc3545;
      box-shadow: 0 0.5rem 1rem rgba(0,0,0,.15);
      &:hover{ box-shadow: 0 0 !important;}
      `}
    >
      <h3 className="mb-4 font-weight-bold">If you can dream it, we can code it.</h3>
      <p>Density Labs is a software development firm serving organizations to accelerate web, mobile, 
        and SaaS application development. Rapidly scale your development team, decrease time to market
        while leveraging the cost economics of nearshore staff augmentation.</p>  
    </Col>
    <Col   className="py-4 mt-4 ml-md-2"
      css={css`
      background: #ffffff;
      box-shadow: 0 0.5rem 1rem rgba(0,0,0,.15);
      &:hover{ box-shadow: 0 0 !important;}
      `}
    >
    <h3 className="mb-3 font-weight-bold"
      css={css`color:#dc3545; `}
    >Benefits of Nearshore</h3>
    <ul css={css`
      list-style:none;
      padding-left: 0;
      & li{
        padding-top: 5px;
        & b {
          color: #dc3545;
        } 
      }
    `}>
      <li>
        <b>1. Time Zone Alignment</b> - 
        Same hours, same meetings, same deadlines.
      </li>
      <li> 
        <b>2. Cultural Alignment</b> – 
        True team integration key for collaboration.
      </li>
      <li>
        <b>3. Cost Efficiency</b> – 
        Leverage lower labor costs. More development for the same budget.
      </li>
      <li>
        <b>4. Stable talent pools</b> – 
        Effectively grow your team with minimal churn and hiring distractions.
      </li>
      <li>
        <b>5. USMCA IP protections</b> – Copyrights, trademarks, NDA agreements enforceable.
      </li>
    </ul>
    </Col>
  </Row>
)
