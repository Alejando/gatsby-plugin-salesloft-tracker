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

const Header = () => (
  <Navbar color="light" light expand="md">
    <Link className="navbar-brand" to="/">
      <img className="mb-0 p-0" style={{ width: 200 }} src={logo} alt="Logo" />
    </Link>
    <NavbarToggler onClick={() => ({})} />
    <Collapse isOpen={true} navbar>
      <Nav className="ml-auto" navbar>
        {
          [
            ['Who we are', '/who-we-are'],
            ['Why us', '/why-us'],
            ['Use Cases', '/work'],
            ['Blog', '/blog'],
            ['Careers', '/careers'],
            ['Contact Us', '/contact-us'],
          ].map(([name, url]) => (
            <NavItem key={url} >
              <Link className="nav-link" to={url}>
                { name }
              </Link>
            </NavItem>
          ))
        }
      </Nav>
    </Collapse>
  </Navbar>
)


export default Header
