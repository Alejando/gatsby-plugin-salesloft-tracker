import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col } from 'reactstrap'
import { css } from 'emotion'
import roundBackground from '../../images/round-small.png'

const Benefit = ({ icon, text }) => (
  <Col xs="6" sm="6" md="3">
    <div css={ css`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 20px;
      align-items: center;
      min-height: 188px;
    `}>
      <div css={ css `
        background-image: url(${roundBackground});
        background-repeat: no-repeat;
        background-position: top;
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        height: 80px;
        background-size: 80px;
      `}>
        <FontAwesomeIcon
          icon={icon}
          color="#E5818D"
          css={ css `
            font-size: 58px;
            margin-top: 13px;
          `}
        />
      </div>
      <div css={ css `
        margin-top: 20px;
        font-size: 1rem;
        text-align: center;
      `}>
        {text}
      </div>
    </div>
  </Col>
)

export default Benefit
