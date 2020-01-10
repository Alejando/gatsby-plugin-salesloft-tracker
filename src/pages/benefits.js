import React from 'react'
import { css } from 'emotion'
import {
  Container,
  Button,
  Row,
  Col
} from 'reactstrap';
import Layout from '../components/layout'
import Banner from '../components/banner'
import Benefit from '../components/benefit/benefit'
import { Link } from 'gatsby'
import bannerImage from '../images/work_densitylabs.png'


const siteMeta = {
  subtitle: 'Benefits',
  path: '/benefits',
  openGraphTitle: 'Join Our Team',
  keywords: 'densitylabs, densitylabs we are hiring, work with us, work with us from home, jobs available, careers, join our team, we are looking for talent people, job opportunities, density labs Join us, benefits, perks',
  description: 'See the great benefits that come with being a part of the team at Density Labs.',
  type: 'website'
}

const Benefits = () => {

  return (
    <Layout siteMeta={siteMeta}>
      <Banner
        image={bannerImage}
      />
      <Container className="py-5">
        <h1
          className="pb-0 text-uppercase m-0 text-center mb-0"
        >
          Company Benefits
        </h1>
          <div className="mt-3 pt-3 text-center mb-5">
            <h4 className="border-top d-block pt-3" css={css`font-weight: 300;`}>
              See the great benefits that come with being a part of the team at Density Labs.
            </h4>
          </div>
        <Container css={css`
          background-color: white; 
          padding: 30px; 
          padding-bottom: 15px;
        `}>
          <Row className="mb-3">
            <Benefit 
              text="Competitive Salary" 
              icon="wallet"
            />
            <Benefit 
              text="Major Medical Expense Insurance" 
              icon="hospital"
            />
            <Benefit 
              text="Life Insurance" 
              icon="hand-holding-heart"
            />
          </Row>
          <Row className="mb-3">
            <Benefit 
              text="Annual Attendance Conference Budget" 
              icon="id-badge"
            />
            <Benefit 
              text="Productivity Bonus" 
              icon="chart-line"
            />
            <Benefit 
              text="Development Opportunities" 
              icon="seedling"
            />
          </Row>
          <Row>
            <Benefit 
              text="Paid Time Off" 
              icon="suitcase-rolling"
            />
            <Benefit 
              text="Work From Monday to Friday"
              icon="balance-scale"
            />
            <Benefit 
              text="Flexible Hours"
              icon="business-time"
            />
          </Row>
        </Container>
        <Row css={ css`
          text-align: center; 
          margin-top: 80px; 
          margin-bottom: 80px;
        `}>
            <Col>
              <Link to="/careers">
                <Button color="danger" >
                  <span className="ml-2" css={ css`font-size: 1.1rem;`}>View Career Opportunities</span>
                </Button>
              </Link>
            </Col>
          </Row>
      </Container>
    </Layout>
  )
}

export default Benefits
