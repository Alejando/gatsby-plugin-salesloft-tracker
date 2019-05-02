import React from 'react'
import { Link } from 'gatsby'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap'
import logo from '../images/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Toggler from './toggler/toggler'
import { css } from 'emotion'
import stickybits from 'stickybits'

class Header extends React.Component {
  componentDidMount(){
    stickybits('.sticky-navbar', {verticalPosition:'top'})
  }

  render(){
    return (<Navbar color="light" light expand="md" className="bg-white sticky-navbar" css={css`
      position: -webkit-sticky; 
      position: sticky;
      top: 0;
      width:100%;
      z-index: 9999;
      border-top: 1px solid #ffffff;
      border-bottom: 2px solid #f1f1f1;
    `}>
      <div className="navbar-brand" css={css`width:200px;`} >
        <Link  to="/" >
          <img className="mb-0 p-0" css={css`width:100%; height:auto;`} src={logo} alt="Logo" />
        </Link>
      </div>
      <Toggler>
        {({
          toggle,
          isOn,
        }) => (
          <>
            <NavbarToggler onClick={toggle}  aria-label="Toggle Menu"/>
            <Collapse isOpen={isOn} navbar>
              <Nav
                className="ml-auto pr-3 d-md-flex flex-md-row"
                css={css`
                  width: auto;
                  @media (min-width: 768px) {
                    width: auto;
                  }
                  @media (min-width: 992px) {
                    width: 660px;
                  }
                `}
                navbar
              >
                {
                  [
                    ['Who we are', '/who-we-are'],
                    ['Why us', '/why-us'],
                    ['Use Cases', '/work'],
                    ['Blog', '/blog'],
                    ['Careers', '/careers'],
                    ['Contact Us', '/contact-us', 'envelope'],
                  ].map(([name, url, icon]) => (
                    <NavItem
                      key={url}
                      className="flex-fill"
                      css={css`
                        &.nav-item > a.nav-link {
                          color: black;
                        }
                        &.nav-item > a.nav-link:hover {
                          color: #ed1c24;
                        }
                      `}
                    >
                      <Link
                        className="nav-link"
                        to={url}
                      >
                        { name }
                        {
                          icon &&
                          <FontAwesomeIcon className="ml-2" icon={["fas", icon]}  />
                        }
                      </Link>
                    </NavItem>
                  ))
                }
              </Nav>
            </Collapse>
          </>
        )}
      </Toggler>
    </Navbar>
    );
  }
}

export default Header
