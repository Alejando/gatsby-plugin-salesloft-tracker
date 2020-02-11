import React from 'react'
import {
  Container,
  Col,
  Row,
} from 'reactstrap';
import Banner from '../components/v2/banner';
import * as R from 'ramda';
import Layout from '../components/layout'
import { graphql } from 'gatsby';
import MemberList from '../components/members/member-list';
import { css } from 'emotion';
import bannerImage from '../images/common_area.png';

const nodeMemberMapper = ({
  frontmatter: {
    name,
    title,
    type,
    image: {
      childImageSharp: {
        resize: {
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

const siteMeta = {
  subtitle: 'Team',
  path: '/team',
  openGraphTitle: 'Team'
}

const bannerRightContent = () => (
  <div
    css={css`
    background-image: url(${bannerImage});
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    min-height: 200px;
    @media (min-width: 768px) {
      min-height: 250px;
    }
    @media (min-width: 992px) {
      
      min-height: 300px;
    }
    `}
  >
  </div>
)

const bannerLeftContent = () => (
  <div 
    className="text-white p-4 d-flex align-items-center"
    css={css`
    background:#dc3545;
    min-height: 200px;
    @media (min-width: 768px) {
      min-height: 250px;
    }
    @media (min-width: 992px) {
      min-height: 300px;
    }
    `}
  >
    <div>
      <h3 className="mb-3 font-weight-bold">MEET THE TEAM</h3>
      <p>We exist because we believe that geographical barriers 
        should not get in the way of putting the best people in the best companies.</p>   
    </div>
  </div>
)

const WhoWeArePage = ({ data }) => {
  const members = dataToMembers(data)
  const executiveTeam = members.filter(isExecutive);
  const teamMembers = members.filter(R.complement(isExecutive))

  return (
    <Layout siteMeta={siteMeta}>
      <Banner 
        background="#f8f9fa"
        leftContent={bannerLeftContent()}
        rightContent={bannerRightContent()}
        rightSizes={[6,6,8,8]}
        leftSizes={[6,6,4,4]}
        noGutters
      />
      <Container>
        <Row noGutters className="mt-5">
          <Col md="12" className="mt-3">
            <MemberList title="Executive Team" members={executiveTeam} executive/>
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
  query {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//(team)/.*.md$/"}},
      sort: { fields: frontmatter___position  }
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
                resize(quality:100){
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
