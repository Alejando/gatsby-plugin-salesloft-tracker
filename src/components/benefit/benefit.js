import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col } from 'reactstrap'
import { css } from 'emotion'
import roundBackground from '../../images/round-small.png'

const Benefit = ({ icon, text }) => (
  <Col md="4" className="mb-3">
    <div css={ css` 
      display: flex; 
      flex-direction: column;
      justify-content: flex-start;
      padding: 20px;
      align-items: center;
      min-height: 264px;
    `}>
      <div css={ css `
        background-image: url(${roundBackground});
        background-repeat: no-repeat;
        background-position: top;
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        height: 142px;
        background-size: 142px;
      `}>
        <FontAwesomeIcon 
          icon={icon} 
          color="#E5818D" 
          css={ css `
            font-size: 116px;
            margin-top: 13px;
          `}
        />
      </div>
      <div css={ css `
        font-weight: bold; 
        margin-top: 20px; 
        font-size: 1.3rem;
        text-align: center;
      `}>
        {text}
      </div>
    </div>
  </Col>
)

export default Benefit
