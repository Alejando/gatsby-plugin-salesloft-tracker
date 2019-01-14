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

const Header = () => (
  <Navbar color="light" light expand="md" className="bg-white">
    <Link className="navbar-brand" to="/">
      <img className="mb-0 p-0" style={{ width: 200 }} src={logo} alt="Logo" />
    </Link>
    <Toggler>
      {({
        toggle,
        isOn,
      }) => (
        <>
          <NavbarToggler onClick={toggle} />
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
)


export default Header
