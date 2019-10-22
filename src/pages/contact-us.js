import React from 'react'
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Layout from '../components/layout'
import Banner from '../components/banner'
import { css } from 'emotion'
import bannerImage from '../images/work_densitylabs.png'
import LocationList from '../components/location/location-list'

import locations from '../../data/locations.json'
import { withPrefix, Link } from 'gatsby';
import { ContactUsForm } from 'dynamic-forms-react'

const siteMeta = {
  subtitle: 'Contact Us',
  path: '/contact-us',
  openGraphTitle: 'Contact us',
  keywords: 'densitylabs, contact us, densitylabs phone number, telephone number of densitylabs, densitylabs address, contact us densitylabs',
  description: 'Do you want to talk about an idea that you have?  Just want to say hi? We are here for you!',
  image: withPrefix('/images/density-labs-contact-us.jpg'),
}
const successMessage = () => {
  return(
    <div>
      Your form has been sent successfully! We’ll be in touch shortly. 
      In the meantime check out <Link to='/blog'>our blog page </Link> to see what we’ve been up to.
    </div>
  );
}

const ContactUs = () => {
  return (
    <Layout siteMeta={siteMeta}>
      <Banner
        image={bannerImage}
        title='Contact Us'
        content='Do you want to talk about an idea that you have? Just want to say hi? We are here for you!'
      />
      <Container className="py-5">
        <Row>
          <Col md="8" className="mb-5">
            <legend className="mb-3">Let's build something amazing!</legend>
            <ContactUsForm 
              endPoint={process.env.CONTACT_US_FORM_URL}
              onSuccess={{'title': 'Success', 'body': successMessage() }}
              onError={{'title': 'Error', 'body': 'An error has ocurred.'}}
            />
          </Col>
          <Col md="4">
            <h3 css={css`font-family:'Sansation', sans-serif;`} className="border-bottom pb-3">
              Density<span css={css`color: #D92635;`}>Labs</span>
            </h3>
            <LocationList locations={locations} />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default ContactUs
