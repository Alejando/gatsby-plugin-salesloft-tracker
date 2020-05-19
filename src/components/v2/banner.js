import React from 'react';
import { css } from 'emotion';
import {
  Row,
  Container,
  Col
} from 'reactstrap';

const isImage = (background) => (
  background.length > 10
)

const Banner = ({
  background,
  rightContent = null,
  leftContent = null,
  rightSizes = [6,6,6,6], // sm, md, lg, xl
  leftSizes = [6,6,6,6], // sm, md, lg, xl
  fluid = false,
  noGutters = false,
  className

}) => (
  <div className={`w-100 ${className}`} css={css`
    ${
      isImage(background) ? 
      `background-image: url(${background});
      background-position: center;
      background-size: cover;`
      :
      `background:${background};`
    }
    `} 
  >
    <Container fluid={fluid} >
      <Row noGutters={noGutters} >
        <Col sm={leftSizes[0]} md={leftSizes[1]} lg={leftSizes[2]} xl={leftSizes[3]}>
          {leftContent}
        </Col>
        <Col sm={rightSizes[0]} md={rightSizes[1]} lg={rightSizes[2]} xl={rightSizes[3]}>
          {rightContent}
        </Col>
      </Row>
  </Container>
  </div>
  
)
export default Banner
