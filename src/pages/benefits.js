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
        title='Join Our Team'
        content='See the great benefits that come with being a part of the team at Density Labs.'
        textAlign= 'center'
      />
      <Container className="py-5">
        <h1
          className="border-bottom pb-5 text-uppercase m-0 text-center mb-5"
        >
          Benefits
        </h1>
        <Container css={css`
          background-color: #eaeaea; 
          padding: 30px; 
          padding-bottom: 15px;
        `}>
          <Row className="mb-3">
            <Benefit 
              text="Competitive Salary" 
              icon="wallet"
              iconOpacity="0.85"
            />
            <Benefit 
              text="Major Medical Expense Insurance" 
              icon="hospital"
              iconOpacity="0.95"
            />
            <Benefit 
              text="Life Insurance" 
              icon="hand-holding-heart"
              iconOpacity="0.90"
            />
          </Row>
          <Row className="mb-3">
            <Benefit 
              text="Annual Attendance Conference Budget" 
              icon="id-badge"
              iconOpacity="0.90"
            />
            <Benefit 
              text="Productivity Bonus" 
              icon="chart-line"
              iconOpacity="0.80"
            />
            <Benefit 
              text="Development Opportunities" 
              icon="seedling"
              iconOpacity="0.90"
            />
          </Row>
          <Row>
            <Benefit 
              text="Paid Time Off" 
              icon="suitcase-rolling"
              iconOpacity="0.90"
            />
            <Benefit 
              text="Work From Monday to Friday"
              icon="balance-scale"
              iconOpacity="0.95"
            />
            <Benefit 
              text="Flexible Hours"
              icon="business-time"
              iconOpacity="0.85"
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
                  <span className="ml-2" css={ css`font-size: 1.1rem;`}>View Careers Opportunities</span>
                </Button>
              </Link>
            </Col>
          </Row>
      </Container>
    </Layout>
  )
}

export default Benefits
