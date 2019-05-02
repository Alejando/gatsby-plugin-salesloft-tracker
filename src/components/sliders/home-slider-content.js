import React from "react";
import {
  Button
} from 'reactstrap'
import { css } from 'emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'

const HomeSliderContent = ({
  title,
  subTitle,
  isActive
}) => (
  <div
    className={isActive ? 'is-active text-center text-white' :'text-center text-white'}
    css={css`
      position: absolute;

      left: 0;
      bottom: 0;
      right: 0;
      transform: translateY(-50%);
      transition: all 0.5s linear, top 0.5s linear;
      top: 45%;
      opacity: 0;
      &.is-active{
        z-index: 1;
        top: 50%;
        opacity: 1;
      }
      @media (max-width: 540px) {
        top: 35%;
        &.is-active{
          top: 40%;
        }
      }
      @media (max-width: 720px) {
        top: 40%;
        &.is-active{
          top: 45%;
        }
      }
    `}
  >
    <h1 className="mb-2 mx-2 font-weight-bold">{title}</h1>
    <h4 className="mb-4 mx-2 font-weight-light">{subTitle}</h4>
    <div className="mb-3 d-inline-flex">
      <Link to="/work">
        <Button color="secondary">
          <div className="m-0 mr-2 d-inline-block"> Check our work </div>
          <FontAwesomeIcon icon={["fas", "bolt"]} />
        </Button>
      </Link>
      <div className="m-2"> or </div>
      <Link to="/contact-us">
        <Button color="danger">
          <div className="m-0 mr-2 d-inline-block"> Contact Us </div>
          <FontAwesomeIcon icon={["fas", "envelope"]} />
        </Button>
      </Link>
    </div>
    <div>
      <Link to="/who-we-are">
        <Button outline color="light">
          <div className="m-0 mr-2 d-inline-block"> Who we are </div>
          <FontAwesomeIcon icon={["fas", "user"]} />
        </Button>
      </Link>
    </div>
  </div>
)

export default HomeSliderContent
