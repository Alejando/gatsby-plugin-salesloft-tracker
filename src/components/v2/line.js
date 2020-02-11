import React from 'react';
import { css } from "@emotion/core"
import logo from '../../images/dl_small_logo.svg'
import {
  Row,
  Col
} from 'reactstrap';
const Line = ({ align = 'center' }) => {
  
  return(
    <Row 
      css={css`
        display: flex;
        align-items: center;
      `}
      className="my-2"
    >

      <Col
        css={css`
          border-bottom: 2px solid;
          height: 2px;
          order: 2;
        `}
      />
      <Col xs={3} sm={2} md={2} lg={2}
        css={css`
          order:${ align === 'left'? 1 : align === 'right'? 3 : 2 };
        `}
        className="d-flex justify-content-center px-md-4 px-lg-4"
      >
        <img 
          width="100%"
          height="100%"
          alt='Density Labs' 
          src={logo}
        />
      </Col>
      <Col
        css={css`
          border-bottom: 2px solid;
          height: 2px;
          order: 2;
        `}
      />
    </Row>
  )
}

export default Line;
