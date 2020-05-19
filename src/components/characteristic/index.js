import React from 'react'
import {
  Col,
  Jumbotron,
} from 'reactstrap';
import {css} from 'emotion'
 
const Characteristic = ({
  titleColor,
  bgColor,
  textColor,
  title,
  descriptionHtml,
}) => (
  <Col md="6" className="my-3" >
      <Jumbotron 
        className="shadow h-100 py-4 mb-0" 
        css={css`
          &:hover{ box-shadow: 0 0 !important; }
          background:#${bgColor};
          border-radius: 0;
        `}
      >
        <h3 css={css`color:#${titleColor};`}>{title}</h3>
        <div 
          className="py-3 text-justify text-left"
          css={css`color:#${textColor}; & ul {padding-left: 25px; } `}
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      </Jumbotron>
  </Col>
)

export default Characteristic