import React from 'react'
import {
  Container,
  Button,
} from 'reactstrap';
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import Banner from '../components/banner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'

import bannerImage from '../images/work_densitylabs.png'
const careersEmailAddress = 'careers@densitylabs.io'

const dataToJobs = data => {
  const edges = data.allMarkdownRemark.edges
  return edges.map(edge => {
    return {
      id: edge.node.id,
      name: edge.node.frontmatter.name,
      requirements: edge.node.frontmatter.job_requirements,
      benefits: edge.node.frontmatter.job_benefits,
      referralBonus: edge.node.frontmatter.job_referral_bonus,
      contentHtml: edge.node.html,
    }
  });
};

const Careers = ({ data }) => {
  const jobs = dataToJobs(data)

  return (
    <Layout>
      <Banner
        image={bannerImage}
        title='Join Our Team'
        content='Density Labs has a workplace where you can grow, learn and get professional development opportunities. We have a highly collaborative environment and we are focused on delivering the best products possible for our clients. We like to keep our team happy while we work in a relaxed and educational environment to develop excellent products for our clients so you can work from home.'
      />
      <Container className="py-5">
        <h1
          className="border-bottom pb-3 text-uppercase"
        >
          JOBS AVAILABLE
        </h1>
        {
        jobs.map((job, i) => (
          <div key={i} className="border-bottom py-4">
            <h2 className="border-bottom pb-3 text-uppercase">{ job.name }</h2>
            <div dangerouslySetInnerHTML={{ __html: job.contentHtml }} />
            <h3>
              <FontAwesomeIcon icon={["fas", "users"]} /> &nbsp;
              What we offer
            </h3>
            <p>Some of the benefits that we offer for our {job.name}</p>
            <ul>
              {job.benefits.map((benefit, i) => (<li key={i}>{benefit}</li>))}
            </ul>
            <h3>
              <FontAwesomeIcon icon={["fas", "thumbs-up"]} /> &nbsp;
              Requirements
            </h3>
            <ul>
              {job.requirements.map((requirement, i) => (<li key={i}>{requirement}</li>))}
            </ul>
            <Button href={`mailto:${careersEmailAddress}`}>
              <FontAwesomeIcon icon={["fas", "envelope"]} />
              <span className="ml-2">Apply Now</span>
            </Button>
            <span className="m-3">or</span>
            <Link to="/seeking-developers-who-love-to-code">
              <Button>
                <FontAwesomeIcon icon={["fas", "user-circle"]} />
                <span className="ml-2">Refer a friend</span>
              </Button>
            </Link>
            {
              job.referralBonus &&
              <p className="mt-3">REFER A FRIEND AND RECEIVE ${job.referralBonus} DOLLARS!!</p>
            }
          </div>
        ))
      }
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/(jobs)/.*.md$/"}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            date
            job_requirements
            job_benefits
            job_referral_bonus
          }
          html
        }
      }
    }
  }
`

export default Careers
