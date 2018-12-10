import React from 'react'
import {
  Container,
  Col,
  Row,
  Jumbotron,
} from 'reactstrap';
import Banner from '../components/banner'
import * as R from 'ramda';
import Layout from '../components/layout'
import { graphql } from 'gatsby';
import MemberList from '../components/members/member-list';

import bannerImage from '../images/work_densitylabs.png'

const nodeMemberMapper = ({
  frontmatter: {
    name,
    title,
    type,
    image: {
      childImageSharp: {
        fixed: {
          src
        }
      }
    },
  },
  html
}) => ({
  name,
  title,
  type,
  imageSrc: src,
  descriptionHtml: html,
});

const isExecutive = R.pipe(R.prop('type'), R.equals('Executive'));

const dataToMembers = R.pipe(
  R.view(R.lensPath(['allMarkdownRemark', 'edges'])),
  R.map(R.pipe(R.prop('node'), nodeMemberMapper))
)

const WhoWeArePage = ({ data }) => {
  const members = dataToMembers(data)
  const executiveTeam = members.filter(isExecutive);
  const teamMembers = members.filter(R.complement(isExecutive))

  return (
    <Layout>
      < Banner image={bannerImage} />
      <Container>
        <Row>
          <Col md="12" className="text-center mt-3">
            <Jumbotron className="p-4 bg-white">
              <h1 className="border-bottom pb-3">Who we are</h1>
              <p className="text-center lead text-muted">We are a full stack software engineering services company specializing in rapid development of mobile, web, SaaS and enterprise applications. </p>
              <p className="text-center lead text-muted"> We work with technology Startups and enterprise companies seeking access to innovation. </p>
              <p className="text-center lead text-muted"> If you can dream it, we can code it.</p>
            </Jumbotron>
          </Col>
          <Col md="12" className="border-top mt-3 pt-2">
            <h2>OUR <strong>PEOPLE</strong></h2>
            <p className="text-muted">The backbone to Density Labs’ success is a shared passion for software engineering, new product development, emerging technologies and a commitment to building personal and trusting relationships with our clients. We pride ourselves on open communication, connecting deeply, the love of coding and passion for life.</p>
          </Col>
          <Col md="12" className="mt-3">
            <MemberList title="Executive Team" members={executiveTeam} />
          </Col>
          <Col md="12" className="mt-3">
            <MemberList title="Superstars" members={teamMembers} />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TeamQuery {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/(team)/.*.md$/"}},
      sort: { fields: frontmatter___name  }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            name
            type
            image {
              childImageSharp {
                fixed(width: 538, height: 498) {
                  src
                }
              }
            }
          }
          html
        }
      }
    }
  }
`

export default WhoWeArePage
