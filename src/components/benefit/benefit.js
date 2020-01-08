import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col } from 'reactstrap'
import { css } from 'emotion'
import roundBackground from '../../images/round-small.png'

const Benefit = ({ icon, text, iconOpacity }) => (
  <Col md="4" className="mb-3">
    <div css={ css` 
      background-color: #fff; 
      display: flex; 
      flex-direction: column;
      justify-content: center;
      padding: 20px;
      align-items: center;
      min-height: 264px;
    `}>
      <div css={ css `
        background-image: url(${roundBackground});
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 142px;
        background-size: 142px;
      `}>
        <FontAwesomeIcon 
          icon={icon} 
          color="#dc3545" 
          css={ css `
            opacity: ${ iconOpacity };
            font-size: 116px;
          `}
        />
      </div>
      <span css={ css `
        font-weight: bold; 
        margin-top: 20px; 
        font-size: 1.3rem;
        text-align: center;
      `}>
        {text}
      </span>
    </div>
  </Col>
)

export default Benefit
