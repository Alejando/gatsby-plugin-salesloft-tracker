import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

import locations from '../../data/locations.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css } from 'emotion';

const call_us = ()=> (
  <div>
    <FontAwesomeIcon icon={["fas", "phone"]} />
    <span className="ml-2">Call us!</span>
  </div>
)

const ContactBar = () => {
  const contactInfo = locations["contact_info"]

  return(
    <div className="bg-dark w-100 py-1 d-lg-none" >
    <Container>
      <Row className="text-white d-flex justify-content-center my-2">
        <Col xs={6} className="d-flex justify-content-center">
          <a 
            href={`tel:${contactInfo[1].phone}`} 
            className="d-inline-flex align-items-center pointer py-1 text-white"
            css={css`cursor:pointer; &:hover{ text-decoration:underline !important;}`}
          >
            { call_us() }
          </a>
        </Col>
        <Col xs={6} className="d-flex justify-content-center">
          <a href={`mailto:${contactInfo[1].email}`} className="text-white  d-inline-flex align-items-center">
          <FontAwesomeIcon icon={["fas", "envelope"]} />
          <span className="ml-2 ">Email us</span>
          </a>
        </Col>
      </Row>
    </Container>
  </div>
  );
};

export default ContactBar;
