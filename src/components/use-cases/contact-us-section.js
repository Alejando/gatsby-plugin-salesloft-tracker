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
      <Section className="d-flex justify-content-around align-items-center" 
        onMouseOver={this.handleMouseHover}
        onMouseLeave={this.handleMouseLeave}
      >
        <h2>{this.state.title}</h2>
        <Link to="/contact-us">
          <Button outline color="light">
            <span className="ml-2">Contact Us</span>
            <FontAwesomeIcon icon={["fas", "envelope"]} className="ml-3"/>
          </Button>
        </Link>
      </Section>
    );
  }
}

export default ContactUsSection;
