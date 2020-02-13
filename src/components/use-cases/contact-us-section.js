import { Component, React } from 'react'
import styled from '@emotion/styled';
import { Button } from 'reactstrap';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Section = styled.div`
  background: #373737;
  height: 110px;
  width: 100%;
  color: #fff;
  font-size: 15px; 
  &:hover{
    background: #dc3545;
    transition: all .8s ease-in-out;
  }
`;

const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 1200px)
  {
    max-width: 1140px;
  }
  @media (max-width: 992px)
  {
    h2 {
      font-size: 24px;
    }
  }
`;

const INITIAL_TITLE = "LET'S BUILD SOMETHING AMAZING!";

class ContactUsSection extends Component {

  state = {
    title: INITIAL_TITLE
  }

  handleMouseHover = () => {
    this.setState({title: 'IF YOU CAN DREAM IT, WE CAN CODE IT'});
  }

  handleMouseLeave = () => {
    this.setState({title: INITIAL_TITLE});
  }

  render() {
    return (
      <Section 
        onMouseOver={this.handleMouseHover}
        onMouseLeave={this.handleMouseLeave}
      >
        <Container className="d-flex justify-content-between align-items-center h-100" >
          <h2>{this.state.title}</h2>
          <Link to="/contact-us">
            <Button outline color="light" className="">
              <span className="ml-2">Contact Us</span>
              <FontAwesomeIcon icon={["fas", "envelope"]} className="ml-3"/>
            </Button>
          </Link>
        </Container>
      </Section>
    );
  }
}

export default ContactUsSection;
