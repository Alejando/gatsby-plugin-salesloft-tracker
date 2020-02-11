import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
} from 'reactstrap';

import locations from '../../data/locations.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css } from 'emotion';

const ContactBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return(
    <div className="bg-dark w-100 py-1 d-lg-none" >
    <Container>
      <Row className="text-white d-flex justify-content-center my-2">
        <Col xs={6} className="d-flex justify-content-center">
          <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-flex align-items-center">
            <DropdownToggle 
              tag="a" 
              className=" d-inline-flex align-items-center pointer py-1"
              css={css`cursor:pointer; &:hover{ text-decoration:underline !important;}`}
            >
              <FontAwesomeIcon icon={["fas", "phone"]} />
              <span className="ml-2">Call us!</span>
            </DropdownToggle>
            <DropdownMenu className="bg-dark">
            {
              locations.map(location => (
                location.show_call_option &&
                <DropdownItem css={css`&:hover a{ color: #343a40 !important;}`} className="my-1">
                  <a 
                    href={`tel:${location.phone}`} 
                    className="text-white py-2"
                    css={css`&:hover { color: #343a40 !important; text-decoration:none;}`}
                  >
                    From {location.country}
                  </a>
                </DropdownItem>
              ))
            }
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col xs={6} className="d-flex justify-content-center">
          <a href={`mailto:${locations[0].email}`} className="text-white  d-inline-flex align-items-center">
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
